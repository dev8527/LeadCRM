import React, { useState, useCallback, useEffect } from "react";
import { Building2, Check, Crown, Filter, Linkedin, Mail, MapPin, Phone, PhoneCall, X } from "lucide-react";
import { prospectSearch } from "../hooks/LeadSearch";

const SearchInterface = ({ onSearch, prospects }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [lastPage, setLastPage] = useState(1);
    const [showFilters, setShowFilters] = useState(true);
    const [selectedProspects, setSelectedProspects] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

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
        user_id: "67ab523487467a559df17f61",
    });

    const itemsPerPage = 10;

    // Search when page changes
    useEffect(() => {
        if (totalResults > 0) {
            handleSearch();
        }
    }, [currentPage]);

    // Reset selection when prospects change
    useEffect(() => {
        setSelectedProspects([]);
        setSelectAll(false);
    }, [prospects.length]);

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
            user_id: "67ab523487467a559df17f61",
            contact_method: "Personal Email | Phone | Work Email | Mobile",
        });
        setTotalResults(0);
        setLastPage(1);
        setCurrentPage(1);
        onSearch([]);
        setSelectedProspects([]);
        setSelectAll(false);
    }, [onSearch]);

    // Handle Select All toggle
    const handleSelectAll = () => {
        if (selectAll) {
            // If currently all selected, deselect all
            setSelectedProspects([]);
        } else {
            // Otherwise select all current prospects
            setSelectedProspects(prospects.map(prospect => prospect.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle individual prospect selection
    const handleProspectSelect = (prospectId) => {
        setSelectedProspects(prev => {
            if (prev.includes(prospectId)) {
                // Deselect if already selected
                const newSelected = prev.filter(id => id !== prospectId);
                // Update selectAll state if needed
                if (newSelected.length !== prospects.length) {
                    setSelectAll(false);
                }
                return newSelected;
            } else {
                // Select if not already selected
                const newSelected = [...prev, prospectId];
                // Update selectAll state if all are now selected
                if (newSelected.length === prospects.length) {
                    setSelectAll(true);
                }
                return newSelected;
            }
        });
    };

    const formatNumber = (num) => {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + "M";
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    };

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Function to mask email
    const maskEmail = (email) => {
        const parts = email.split("@");
        if (parts.length === 2) {
            return "****@" + parts[1];
        }
        return "****@" + email;
    };

    // Function to mask phone numbers
    const maskPhone = (phone) => {
        return phone.replace(/\d(?=\d{4})/g, "");
    };
    const handleEmailRequest = (type, prospectId) => {
        console.log(`Requesting ${type} email & phone for prospect ID: ${prospectId}`);
        // Make an API call or perform necessary actions here
        // Example: fetch(`/api/get-contact?type=${type}&id=${prospectId}`)
    };

    const handleEmailPhoneRequest = (type, prospectId) => {
        console.log(`Requesting ${type} email & phone for prospect ID: ${prospectId}`);
        // Make an API call or perform necessary actions here
        // Example: fetch(`/api/get-contact?type=${type}&id=${prospectId}`)
    };

    // Get filter label
    const getFilterLabel = (field) => {
        const labels = {
            name: "Name",
            companyIndustry: "Industry",
            currentTitle: "Title",
            location: "Location",
            skills: "Skills",
            yearsExperience: "Years of Experience",
            degree: "Degree",
            companySize: "Company Size",
            contactMethod: "Contact Method",
            employer: "Employer"
        };
        return labels[field] || field.replace(/([A-Z])/g, " $1");
    };

    // Toggle filters visibility on mobile
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Handle export function
    const handleExport = () => {
        if (selectedProspects.length === 0) {
            addToast("Please select at least one prospect to export", "error");
            return;
        }

        // Get the selected prospect objects
        const prospectsToExport = prospects.filter(prospect =>
            selectedProspects.includes(prospect.id)
        );

        addToast(`Exporting ${prospectsToExport.length} prospects`, "success");
        // Here you would implement the actual export functionality
        console.log("Exporting prospects:", prospectsToExport);
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

            {/* Mobile Toggle for Filters */}
            <div className="md:hidden mb-4">
                <button
                    onClick={toggleFilters}
                    className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                    <Filter size={18} />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {/* Flex Container for Search and Results bg-blue-600 hover:bg-blue-700*/}
            <div className="flex flex-col md:flex-row gap-1">
                {/* Search Bar Section */}
                <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4 rounded-lg border border-gray-200 w-300`}>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-t-lg">
                        <div className="flex gap-2 mt-2">
                            <span
                                onClick={handleSearch}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition applybtn"
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Apply Filters"}
                            </span>

                            <span
                                onClick={clearFilters}
                                className="flex items-center justify-center font-medium py-2 px-3 transition cursor"
                                title="Clear Filters"
                            >
                                <Filter size={16} />
                            </span>
                        </div>
                    </div>

                    {/* Filter Inputs */}
                    <div className="p-4 space-y-3 max-h-screen overflow-y-auto">
                        {/* Filter Inputs */}
                        {["name", "currentTitle", "employer", "companyIndustry", "location", "skills", "yearsExperience", "degree", "companySize", "contactMethod"].map((field) => (
                            <div key={field} className="mb-3">
                                <input
                                    type={field === "yearsExperience" ? "number" : "text"}
                                    value={filters[field]}
                                    onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`${getFilterLabel(field).toLowerCase()}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex-1">
                    {prospects.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Search Results ({formatNumber(totalResults)})
                                    {selectedProspects.length > 0 &&
                                        <span className="ml-2 text-sm text-blue-600">
                                            {selectedProspects.length} selected
                                        </span>
                                    }
                                </h2>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleExport}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${selectedProspects.length > 0
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                        disabled={selectedProspects.length === 0}
                                    >
                                        Export
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="3">Get Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {prospects.map((prospect) => (
                                            <tr key={prospect.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProspects.includes(prospect.id)}
                                                        onChange={() => handleProspectSelect(prospect.id)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-start gap-3">
                                                        {(() => {
                                                            const fullName = prospect.name || "No Name";
                                                            const nameParts = fullName.trim().split(" ");
                                                            const firstName = nameParts[0] || "";
                                                            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

                                                            return (
                                                                <>
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 border border-blue-200 mb-2">
                                                                            {prospect.profile_pic ? (
                                                                                <img
                                                                                    className="w-full h-full object-cover rounded-full"
                                                                                    src={prospect.profile_pic}
                                                                                    alt={fullName}
                                                                                />
                                                                            ) : (
                                                                                <span className="font-semibold text-xs">
                                                                                    {firstName.charAt(0).toUpperCase()}
                                                                                    {lastName.charAt(0) ? lastName.charAt(0).toUpperCase() : ""}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {/* LinkedIn icon now directly below profile picture */}
                                                                        {prospect.linkedin_url ? (
                                                                            <a
                                                                                href={prospect.linkedin_url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                                            >
                                                                                <Linkedin size={12} />
                                                                            </a>
                                                                        ) : (
                                                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400">
                                                                                <Linkedin size={12} />
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <div className="flex flex-col">
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                            {firstName} {lastName}
                                                                        </p>
                                                                        <p className="text-xs text-gray-600">
                                                                            {(prospect.current_title || "No Title").length > 15
                                                                                ? (prospect.current_title || "No Title").slice(0, 50) + "..."
                                                                                : prospect.current_title || "No Title"}
                                                                        </p>
                                                                        <a
                                                                            href="#"
                                                                            className="text-xs text-blue-600 hover:underline"
                                                                        >
                                                                            {prospect.current_employer || "No Company"}
                                                                        </a>
                                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                                            <MapPin size={12} className="mr-1" />
                                                                            {prospect.location || "Unknown"}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    {prospect.teaser ? (
                                                        <div className="text-xs space-y-1">
                                                            {prospect.teaser.emails && prospect.teaser.emails.length > 0 ? (
                                                                <div className="flex items-center gap-2">
                                                                    <Mail size={14} className="text-gray-400" />

                                                                    <span>{maskEmail(prospect.teaser.emails[0])}</span>
                                                                </div>
                                                            ) : null}

                                                            {prospect.teaser.phones && prospect.teaser.phones.length > 0 ? (
                                                                <div className="flex items-center gap-2">
                                                                    <Phone size={14} className="text-gray-400" />
                                                                    <span>{maskPhone(prospect.teaser.phones[0].number)}</span>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-gray-500">No contact info</span>
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 whitespace-nowrap text-left">
                                                    {prospect.teaser?.emails?.length > 0 ? (
                                                        <div className="relative group inline-block">
                                                            <span onClick={() => handleEmailRequest("standard", prospect.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 cursor">
                                                                <Mail size={16} />
                                                            </span>
                                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-1 rounded">
                                                                Get Emails <br></br>(Consumes 1 Credit)
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group inline-block">
                                                            <span onClick={() => handleEmailRequest("standard", prospect.id)}className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 cursor">
                                                                <Mail size={16} />
                                                            </span>
                                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-1 rounded">
                                                                Get Emails <br></br>(Consumes 1 Credit)
                                                            </span>
                                                        </div>
                                                    )}

                                                    {prospect.teaser?.phones?.length > 0 ? (
                                                        <div className="relative group inline-block">
                                                            <span
                                                                onClick={() => handleEmailPhoneRequest("premium", prospect.id)}
                                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer"
                                                            >
                                                                <Crown size={16} />
                                                            </span>
                                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-1 rounded">
                                                                Get Phones & Emails <br />(Consumes 2 Credit)
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group inline-block">
                                                            <span
                                                                onClick={() => handleEmailPhoneRequest("premium", prospect.id)}
                                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 cursor-pointer"
                                                            >
                                                                <Crown size={16} />
                                                            </span>
                                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-1 rounded">
                                                                Get Phones & Emails <br />(Consumes 2 Credit)
                                                            </span>
                                                        </div>
                                                    )}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                            <span className="font-medium">
                                                {Math.min(currentPage * itemsPerPage, totalResults)}
                                            </span>{" "}
                                           
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <button
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${currentPage === 1
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="sr-only">Previous</span>
                                                &larr;
                                            </button>

                                            {/* Page numbers */}
                                            {Array.from({ length: Math.min(10, lastPage) }, (_, i) => {
                                                let pageNumber;

                                                // Logic for showing page numbers around current page
                                                if (lastPage <= 10) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage >= lastPage - 2) {
                                                    pageNumber = lastPage - 4 + i;
                                                } else {
                                                    pageNumber = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handlePageChange(pageNumber)}
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                                                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                            }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            })}

                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage === lastPage}
                                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${currentPage === lastPage
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="sr-only">Next</span>
                                                &rarr;
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                                <div className="flex sm:hidden justify-between w-full">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className={`${currentPage === 1
                                            ? 'bg-gray-200 text-gray-500'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            } px-3 py-1 rounded-md text-sm font-medium`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        Page {currentPage} of {lastPage}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === lastPage}
                                        className={`${currentPage === lastPage
                                            ? 'bg-gray-200 text-gray-500'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            } px-3 py-1 rounded-md text-sm font-medium`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
                            {loading ? (
                                <div className="text-center">
                                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                    <p className="mt-4 text-gray-600">Searching for prospects...</p>
                                </div>
                            ) : (
                                <>
                                    <img className="w-100 h-100 mb-6 object-contain" src="/src/assets/images/leads.jpg" alt="Leads" />
                                    <div className="text-center max-w-md px-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Discover your perfect leads
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Access to a vast database of 700M+ contacts from over 60M companies worldwide.
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Use the filters on the left to find verified emails and phone numbers for your target prospects.
                                        </p>
                                    </div>
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