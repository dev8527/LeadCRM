import React, { useState, useCallback } from "react";
import { Building2, Check, EqualApproximatelyIcon, Filter, Linkedin, Mail, Mailbox, MapPin, Phone, PhoneCall, X } from "lucide-react";
import { prospectSearch } from "../hooks/LeadSearch"; // Assuming it's an API function

const SearchInterface = ({ onSearch, prospects }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [lastPage, setLastPage] = useState(1);

    // Filter States
    const [filters, setFilters] = useState({
        companyIndustry: "",
        currentTitle: "",
        location: "",
        skills: "",
        yearsExperience: "",
        degree: "",
        companySize: "",
        contactMethod: "",
        employer: "",
        name: "",
        contact_method: "Personal Email | Phone | Work Email | Mobile",
        user_id: "67ab523487467a559df17f61", // Static value
    });

    const itemsPerPage = 10; // Number of items per page

    // Handle search API call
    const handleSearch = async () => {
        setLoading(true);
        try {
            const formattedFilters = {
                user_id: filters.user_id,
                page: currentPage,
                perPage: itemsPerPage,
                query: {
                    name: filters.name ? [filters.name] : [],
                    company_industry: filters.companyIndustry ? [filters.companyIndustry] : [],
                    current_title: filters.currentTitle ? [filters.currentTitle] : [],
                    geo: filters.location ? [filters.location] : [],
                    skills: filters.skills ? [filters.skills] : [],
                    years_experience: filters.yearsExperience ? Number(filters.yearsExperience) : null,
                    degree: filters.degree ? [filters.degree] : [],
                    company_size: filters.companySize ? [filters.companySize] : null,
                    contact_method: filters.contactMethod ? [filters.contactMethod] : [],
                    employer: filters.employer ? [filters.employer] : [],
                    contact_method: filters.contact_method ? [filters.contact_method] : [],
                },
            };

            const response = await prospectSearch(formattedFilters);
            if (response.data?.profiles) {
                onSearch(response.data.profiles);
                setTotalResults(response.data.pagination.total);
                setLastPage(response.data.pagination.lastPage);
                addToast("Search completed successfully", "success");
            } else {
                addToast("No profiles found", "error");
            }
        } catch (error) {
            console.error("Search failed", error);
            addToast(error.response?.data?.message || "Search failed. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    // Add toast notifications
    const addToast = (message, type) => {
        const id = Date.now();
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id, message, type }
        ]);
        setTimeout(() => {
            setNotifications((prevNotifications) => prevNotifications.filter((toast) => toast.id !== id));
        }, 3000);
    };

    // Clear search filters
    const clearFilters = useCallback(() => {
        setSearchQuery("");
        setFilters({
            companyIndustry: "",
            currentTitle: "",
            location: "",
            skills: "",
            yearsExperience: "",
            degree: "",
            companySize: "",
            employer: "",
            name: "",
            user_id: "67ab523487467a559df17f61", // Keep user_id intact
        });
        setTotalResults(0);
        setLastPage(1);
        onSearch([]);
    }, [onSearch]);

    const totalPages = Math.ceil(totalResults / itemsPerPage);
    const paginatedProspects = prospects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatNumber = (num) => {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + "M"; // Convert to Millions
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + "K"; // Convert to Thousands
        } else {
            return num.toString(); // Return as is if less than 1,000
        }
    };

    // Example usage:
    const searchResultsCount = totalResults;
    // console.log(formatNumber(searchResultsCount)); // Output: "117.2M"
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage((prev) => prev + 1);
            handleSearch();
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            handleSearch();
        }
    };
    // Function to mask email (e.g., "********@vvdntech.com")
    const maskEmail = (email) => {
        const parts = email.split("@");
        console.log(parts);
        if (parts.length === 1) {
            return "********@" + parts[0]; // Keep only the domain
        }
        return "********"; // If email is invalid
    };

    // Function to mask phone numbers (e.g., "+47 51 48 *****")
    const maskPhone = (phone) => {
        return phone.replace(/\d(?=\d{4})/g, "*"); // Mask all digits except last 4
    };

    return (
        <div className="p-2 bg-white rounded-lg">
            {/* Toast Notifications */}
            {notifications.length > 0 && (
                <div className="fixed top-4 right-4 z-50">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 mb-2 rounded-lg shadow-lg border-l-4 ${notification.type === "success"
                                ? "bg-green-100 text-green-700 border-green-500"
                                : "bg-red-100 text-red-700 border-red-500"
                                }`}
                        >
                            {notification.message}
                        </div>
                    ))}
                </div>
            )}

            {/* Flex Container for Search and Results */}
            <div className="flex gap-6">
                {/* Search Bar Section */}
                <div className="flex-1 rounded-lg border border-gray-200 filter ">
                    <div className="flex items-center justify-between p-4 bg-white-100 rounded-lg shadow-sm">
                        <p className="text-sm font-semibold">Search Filters</p>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 applybtn"
                            disabled={loading} // Disable the button when loading
                        >
                            {loading ? "Searching..." : "Apply"}
                        </button>
                    </div>

                    {/* Filter Inputs */}
                    <div className="p-4 relative z-10">
                        <div className="flex items-center justify-end p-0 bg-white-100">
                            <Filter onClick={clearFilters} className="clearFilters">
                                Clear Filters
                            </Filter>
                        </div>


                        {/* Name Input */}
                        <div className="mb-4">
                            {/* <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="w-full p-2 mt-1 border text-sm border-gray-300 rounded-sm"
                            /> */}
                        </div>

                        {/* Other Filters */}
                        {["name", "companyIndustry", "currentTitle", "location", "skills", "yearsExperience", "degree", "companySize", "contactMethod", "employer"].map((field) => (
                            <div key={field} className="mb-4">
                                <label className="block text-sm text-gray-700">
                                    {field.replace(/([A-Z])/g, " $1")}
                                </label>
                                <input
                                    type={field === "yearsExperience" ? "array" : "text"}
                                    value={filters[field]}
                                    onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
                                    className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex-3 w-full mt-6">
                    {prospects.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-200">

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Search Results ({formatNumber(totalResults)})
                                </h2>

                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prospects.map((prospect) => (
                                            <tr key={prospect.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-2 text-gray-500">
                                                    <input className="" type="Checkbox"></input>
                                                </td>
                                                <td className="px-6 py-2 contactName editContact contactTable">
                                                    <div className="table-common flex items-center gap-3">
                                                        {/* Extract First & Last Name */}
                                                        {(() => {
                                                            const fullName = prospect.name || "No Name";
                                                            const nameParts = fullName.trim().split(" ");
                                                            const firstName = nameParts[0] || "";
                                                            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

                                                            return (
                                                                <>
                                                                    {/* Profile Picture or Name Initial */}
                                                                    <div className="leads_profile_img table-common w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                                                        {prospect.profile_pic ? (
                                                                            <img
                                                                                className="w-full h-full object-cover"
                                                                                src={prospect.profile_pic}
                                                                                alt="profile"
                                                                            />
                                                                        ) : (
                                                                            <span className="text-gray-600 font-semibold text-lg">
                                                                                {firstName.charAt(0).toUpperCase()}
                                                                                {lastName.charAt(0) ? lastName.charAt(0).toUpperCase() : ""}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {/* Prospect Name, Title, Company & Location */}
                                                                    <div className="prospectsname table-common">
                                                                        <div className="d-flex flex-col">
                                                                            {/* First & Last Name */}
                                                                            <p className="lead_person_name font-semibold text-gray-900">
                                                                                {firstName} {lastName}
                                                                            </p>

                                                                            {/* Job Title */}
                                                                            <p className="lead_person_post text-sm text-gray-700">
                                                                                {prospect.current_title || "No Title"}
                                                                            </p>

                                                                            {/* Company Name (Clickable) */}
                                                                            <a
                                                                                href="javascript:void(0)"
                                                                                className="lead_person_companyname text-blue-600 hover:underline text-sm"
                                                                            >
                                                                                {prospect.current_employer || "No Company"}
                                                                            </a>

                                                                            {/* Location */}
                                                                            <p className="lead_person_address text-sm text-gray-500">
                                                                                {prospect.location || "Unknown"}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-2 text-gray-500 text-sm">
                                                    {prospect.teaser ? (
                                                        <div>
                                                            {/* Masked Email */}
                                                            {prospect.teaser.preview.length > 0 ? (
                                                                <p>{maskEmail(prospect.teaser.preview[0])}</p>
                                                            ) : (
                                                                <p> No Email</p>
                                                            )}

                                                            {/* Masked Phone Numbers */}
                                                            {prospect.teaser.phones.length > 0 ? (
                                                                <p>{maskPhone(prospect.teaser.phones[0].number)}</p>
                                                            ) : (
                                                                <p>No Phone</p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p>No Contact Info</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-2 text-gray-500 text-sm">
                                                    {prospect.linkedin_url ? (
                                                        <a
                                                            href={prospect.linkedin_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <Linkedin size={17} />
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">No LinkedIn</span>
                                                    )}
                                                </td>


                                                <td className="px-6 py-2 text-gray-500 text-sm">
                                                    {prospect.teaser?.preview?.length > 0 ? (
                                                        <Mail size={17} />
                                                    ) : (
                                                        <span className="text-gray-400">No Email</span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-2 text-gray-500 text-sm">
                                                    {prospect.teaser?.phones?.length > 0 ? (
                                                        <PhoneCall size={17} />
                                                    ) : (
                                                        <span className="text-gray-400">No Phone</span>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-between mt-4 px-6 py-3 border-t border-gray-200">
                                <button onClick={handlePrevPage} disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                                    Previous
                                </button>
                                <span>Page {currentPage} of {lastPage}</span>
                                <button onClick={handleNextPage} disabled={currentPage === lastPage}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full w-full">

                            {loading ? (
                                <p className="text-center text-gray-500">Searching...</p>
                            ) : (
                                <>
                                    <img className="searchImg w-30 h-48" src="/src/assets/images/leads.jpg" alt="Leads" />
                                    <p className="text-gray-500 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
                                        <strong >Discover your perfect leads with access to a vast database of <br></br> 700M+ contacts from over 60M companies worldwide.</strong>
                                        <br />
                                        <span className="text-sm">
                                        Easily find verified emails and phone numbers for your target prospects using advanced search by name, keyword, or custom filters—streamlining your outreach like never before.
                                        </span>
                                    </p>
                                </>
                            )}


                        </div>


                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchInterface;
