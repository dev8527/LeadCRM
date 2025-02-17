
import axios from "axios";
import Prospect from '../models/ProspectModel.js'; // Import your Mongoose model
import LeadFinder from '../models/LeadFinder.js';
import LeadFilter from '../models/SaveLeadFilters.js';
import CoinTransactions from '../models/CoinTransactions.js'
import { Queue } from "bullmq";
import dotenv from 'dotenv';
dotenv.config();


const ROCKETREACH_API = process.env.ROCKETREACH_API_URL;
const bulkRevealQueue = new Queue("bulkRevealLeads");

export const searchContacts = async (req, res) => {
    const API_KEY = process.env.ROCKETREACH_API_KEY;
    const url = 'https://api.rocketreach.co/api/v2/search';

    if (!API_KEY) {
        console.error('❌ API Key is missing. Check your .env file.');
        return res.status(500).json({ error: 'API Key is missing' });
    }

    const processData = req.body;

    // Validate required fields
    if (!processData.query) {
        return res.status(400).json({ error: "❌ userId and teamId are required." });
    }

    if (!processData.query || typeof processData.query !== 'object' || Object.keys(processData.query).length === 0) {
        return res.status(400).json({ error: "❌ Query parameters are required." });
    }

    let page = processData.query.page || 1;
    let perPage = processData.query.perPage || 10;
    if (page > 0) {
        page = (page - 1) * perPage + 1;
    } else {
        page = 1;
    }

    // Function to remove empty fields
    function removeEmptyFields(obj) {
        if (!obj || typeof obj !== "object") {
            return {}; // Return an empty object if obj is null or undefined
        }
    
        return Object.fromEntries(
            Object.entries(obj).filter(([_, v]) =>
                (Array.isArray(v) && v.length > 0) ||
                (typeof v === "string" && v.trim() !== "")
            )
        );
    }
    
    // console.log(processData, "processData");
    const filteredFilters = removeEmptyFields(processData.query.query);
    // Ensure `filters` is not empty
    if (Object.keys(filteredFilters).length === 0) {
        return res.status(400).json({ error: "❌ Filters cannot be empty." });
    }

    const data = {
        query: filteredFilters,
        start: page,
        page_size: perPage,
        order_by: processData.order_by || "popularity"
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Api-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });

        if (response.data.code === 'throttled') {
            const waitTime = response.data.wait;
            console.warn(`⚠️ Rate limit reached. Retry after ${Math.round(waitTime / 60)} minutes.`);
            return res.status(429).json({
                message: `Rate limit reached. Please wait ${Math.round(waitTime / 60)} minutes before trying again.`,
                waitTime: waitTime
            });
        }

        if (!response.data.profiles || response.data.profiles.length === 0) {
            return res.status(402).json({ message: '⚠️ No relevant prospects found. Try changing filters.' });
        }

        let lastPage = response.data.pagination.total > 10000 ? 10000 : response.data.pagination.total;
        response.data.pagination.lastPage = lastPage;

        // ✅ Save filter details to database (Now ensures `filters`, `userId`, and `teamId` are present)
        await LeadFilter.create({
            user_id: processData.query.user_id,
            result_count: lastPage,
            lead_filters: filteredFilters
        });

        let leadProfileIds = response.data.profiles.map(profile => profile.id);

        let checkContactRecord = await LeadFinder.find({
            user_id: processData.query.user_id,
            profile_id: { $in: leadProfileIds }
        });

        response.data.profiles = response.data.profiles.map(profile => {
            let contactRecord = checkContactRecord.find(record => record.profile_id === profile.id);

            if (contactRecord) {
                profile.leadStatus = contactRecord.status === 1 ? "revealed" : "Searching";
                profile.lookup_type = contactRecord.lookup_type;
                profile.contactMasterId = contactRecord.contact_master_id || null;
                profile.lead_list_id = contactRecord.lead_list_id || [];
                if (contactRecord.status !== 0) {
                    profile = { ...profile, ...contactRecord.lead_details };
                }
            } else {
                profile.leadStatus = "New";
            }
            return profile;
        });

        res.json({ message: '✅ Search Result Listed', data: response.data });
    } catch (error) {
        console.error('❌ API Request Error:', error.response ? error.response.data : error.message);

        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data
            });
        } else if (error.code === 'ECONNABORTED') {
            return res.status(408).json({ error: '⏳ Request timed out' });
        } else {
            return res.status(500).json({ error: '🚨 Internal server error' });
        }
    }
};


export const addProspect = async (req, res) => {
    try {
        const prospects = req.body; // Expecting an array of prospects

        if (!Array.isArray(prospects) || prospects.length === 0) {
            return res.status(400).json({ message: "Request body must be a non-empty array of prospects." });
        }

        // Validate each prospect
        for (let prospect of prospects) {
            console.log(prospect);
            const { user_id, name, email, phone, company, lookup_type } = prospect;

            if (!user_id, !name || !email || !phone || !company || lookup_type === undefined) {
                return res.status(400).json({ message: "Each prospect must include user_id,name, email, phone, company, and lookup_type." });
            }

            if (![0, 1, 2].includes(lookup_type)) {
                return res.status(400).json({ message: `Invalid lookup_type for email: ${email}. Allowed values are 0, 1, or 2.` });
            }

            const existingProspect = await Prospect.findOne({ email });
            if (existingProspect) {
                return res.status(409).json({ message: `Prospect with email ${email} already exists.` });
            }
        }

        // Insert multiple prospects at once
        const newProspects = await Prospect.insertMany(prospects);

        return res.status(201).json({
            message: "Prospects added successfully",
            data: newProspects
        });

    } catch (error) {
        console.error("Error adding prospects:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getProspects = async (req, res) => {
    try {
        console.log(req.body)
        const { user_id } = req.body; // Extract user_id from request
        console.log(req.body)

        // Validate user_id
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Fetch prospects for the given user_id
        const prospects = await Prospect.find({ user_id });

        if (prospects.length === 0) {
            return res.status(404).json({ message: "No prospects found for this user." });
        }

        return res.status(200).json({
            message: "Prospects retrieved successfully",
            data: prospects
        });

    } catch (error) {
        console.error("Error fetching prospects:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

function removeEmptyFilters(query) {
    return Object.fromEntries(Object.entries(query).filter(([_, v]) => v !== null && v !== '' && v !== undefined));
}

export const bulkLookup = async (req, res) => {
    try {
        const processData = req.body.data;

        if (!processData || !Array.isArray(processData.query)) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        // Process immediate lookups if less than 51
        if (processData.query.length < 51) {
            try {
                for (const lookup of processData.query) {
                    if (lookup) {
                        const newEntry = {
                            id: new ObjectId(lookup.id),
                            lookup_type: lookup.lookup_type,
                            user_id: new ObjectId(processData.user_id),
                            team_id: new ObjectId(processData.team_id),
                            organization_id: new ObjectId(processData.organization_id),
                            user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                            device_type: "WEB",
                            app_version: "1",
                            user_sublevel: 10,
                            user_timezone: "Asia/Kolkata",
                            transaction_type: 1,
                            contact_status: 0,
                            imported_type: 13,
                            lead_list_id: processData.lead_list_id || null
                        };

                        await lookupByNameAndEmployer(newEntry);
                    }
                }

                return res.status(200).json({ message: "Records successfully added to the lead list." });
            } catch (error) {
                console.error("Error:", error);
                return res.status(500).json({ message: "Error adding records to the lead list." });
            }
        } else {
            // Chunk queries into groups of 5 and add to queue
            const queryChunks = chunkArray(processData.query, 5);

            for (const chunk of queryChunks) {
                const chunkProcessData = {
                    ...processData,
                    profile_id: chunk,
                };

                // Remove unnecessary fields
                delete chunkProcessData.query;
                delete chunkProcessData.user_sublevel;
                delete chunkProcessData.user_timezone;
                delete chunkProcessData.user_agent;
                delete chunkProcessData.device_type;
                delete chunkProcessData.app_version;

                await bulkRevealQueue.add("processBulkLeads", chunkProcessData);
            }

            return res.status(200).json({ message: "Please wait a few minutes, data will be populated in your lead list soon." });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

const lookupByNameAndEmployer = async (processData) => {
    try {
        let lookupType = processData.lookup_type || "standard";
        processData.coins = lookupType === "standard" ? 1 : 2;

        if (!processData.id || processData.id.length === 0) {
            return { success: false, message: "Name and Current Employer not found", status: 404 };
        }

        let results = {};

        for (const id of processData.id) {
            const userBalance = await UserRole.findOne({
                user_id: processData.user_id,
                team_id: processData.team_id,
            });

            if (!userBalance) {
                return { success: false, message: "Insufficient credits.", status: 402 };
            }

            let { CoinBalance, boughtCoinBalance } = userBalance;
            let sufficientCoins = CoinBalance >= processData.coins;
            let sufficientBoughtCoins = boughtCoinBalance >= processData.coins;

            if (!sufficientCoins && !sufficientBoughtCoins) {
                return { success: false, message: "You do not have enough credits.", status: 402 };
            }

            // Deduct Coins
            if (sufficientCoins) {
                CoinBalance -= processData.coins;
            } else if (sufficientBoughtCoins) {
                boughtCoinBalance -= processData.coins;
            }

            // Update user balance
            await UserRole.updateOne(
                { user_id: processData.user_id, team_id: processData.team_id },
                { CoinBalance, boughtCoinBalance }
            );

            // Create Transaction
            const transaction = await CoinTransactions.create({
                user_id: processData.user_id,
                coins_used: processData.coins,
                transaction_type: "1",
                timestamp: new Date(),
            });

            // Call RocketReach API
            const webhookId = process.env.APP_ENV === "development" ? 83991 : 46372;
            const rocketReachResponse = await axios.get(
                `https://api.rocketreach.co/api/v2/person/lookup?id=${id}&lookup_type=${lookupType}&webhook_id=${webhookId}`,
                {
                    headers: { Authorization: process.env.ROCKETREACH_API_KEY2 },
                }
            );

            if (!rocketReachResponse.data || rocketReachResponse.data.status !== "complete") {
                return { success: false, message: "RocketReach search incomplete.", status: 403 };
            }

            let result = rocketReachResponse.data;
            let emails = filterValidEmails(result.emails || []);
            let phones = filterValidPhones(result.phones || []);
            let fallbackEmail = emails.length > 0 ? emails[0].email : "";
            processData.email_verify_status = getEmailVerificationStatus(emails[0]);

            let contactData = {
                profile_id: result.id,
                first_name: result.name.split(" ")[0] || "",
                last_name: result.name.split(" ")[1] || "",
                company_name: result.current_employer || "",
                company_domain: result.current_employer_domain || "",
                primary_email: fallbackEmail,
                phone_number: phones.length > 0 ? phones[0].number : "",
                linkedin_link: result.links?.linkedin || "",
                lookup_type: lookupType,
                job_title: result.current_title || "",
                dob: result.birth_year || "",
                state: result.region || "",
            };

            let leadDetails = {
                ...contactData,
                status: result.status,
                job_history: result.job_history || [],
                skills: result.skills || [],
                education: result.education || [],
                links: result.links || {},
                profile_pic: result.profile_pic || "",
            };

            // Store in MongoDB
            await ImportedContact.updateOne(
                { profile_id: result.id, user_id: processData.user_id },
                { $set: contactData },
                { upsert: true }
            );

            await LeadFinder.updateOne(
                { profile_id: result.id, user_id: processData.user_id },
                { $set: { lead_details: leadDetails, lookup_type: lookupType, status: "revealed" } },
                { upsert: true }
            );

            results[id] = result;
        }

        return { success: true, message: "Lookup successful.", data: results, status: 200 };
    } catch (error) {
        console.error("Lookup error:", error);
        return { success: false, message: "Something went wrong.", status: 500 };
    }
};


// Filter Valid Emails
const filterValidEmails = (emails) => {
    const gradePriority = { A: 1, "A-": 2, B: 3, "B-": 4, C: 5, D: 6, F: 7 };
    const smtpPriority = { valid: 1, inconclusive: 2, invalid: 3 };

    emails = emails.filter((email) => email.smtp_valid !== "invalid" && gradePriority[email.grade] < gradePriority["B-"]);

    return emails.sort((a, b) => {
        if (gradePriority[a.grade] !== gradePriority[b.grade]) {
            return gradePriority[a.grade] - gradePriority[b.grade];
        }
        if (smtpPriority[a.smtp_valid] !== smtpPriority[b.smtp_valid]) {
            return smtpPriority[a.smtp_valid] - smtpPriority[b.smtp_valid];
        }
        return a.last_validation_check.localeCompare(b.last_validation_check);
    });
};

// Filter Valid Phones
const filterValidPhones = (phones) => {
    return phones.filter((phone) => phone.validity === "valid" || phone.recommended);
};

// Get Email Verification Status
const getEmailVerificationStatus = (email) => {
    if (!email) return 2;
    if (email.grade === "A" || email.grade === "A-") return 1;
    if (email.grade === "B" && email.smtp_valid === "inconclusive") return 3;
    return 2;
};


function chunkArray(array, chunkSize) {
    return array.reduce((all, one, i) => {
        const ch = Math.floor(i / chunkSize);
        all[ch] = [].concat((all[ch] || []), one);
        return all;
    }, []);
}

