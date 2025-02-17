import axios from 'axios';

const API_URL_AUTH = 'http://localhost:5000/api';  // Default to local if no env variable

// Modified function for prospect search
export const prospectSearch = async (query: {
    name: string;
    company_competitors?: any[];
    company_id?: any[];
    company_industry?: any[];
    company_industry_keywords?: any[];
    company_intent?: any[];
    company_list?: string;
    company_naics_code?: any[];
    company_news_timestamp?: any[];
    company_revenue?: any;
    company_sic_code?: any[];
    company_size?: any;
    company_tag?: string;
    contact_info?: string;
    contact_method?: string;
    current_title?: any[];
    degree?: any[];
    department?: any[];
    email_grade?: string;
    employer?: any[];
    excludeContacts?: boolean;
    geo?: any[];
    health_credentials?: any[];
    health_license?: string;
    health_npi?: string;
    health_specialization?: any[];
    job_change_range_days?: any;
    keyword?: string;
    link?: string;
    major?: any[];
    management_levels?: any[];
    school?: any[];
    skills?: any[];
    years_experience?: any;
}) => {
    // Construct the payload based on the provided query
    const activationToken = localStorage.getItem("authToken");

    const config = {
        headers: { Authorization: `Bearer ${activationToken}` }
    };

    // Remove start and page_size as they are not needed
    const payload = {
        
        query,  // Use the provided query object as the query part
        order_by: "relevance"
    };


    try {
        const response = await axios.post(`${API_URL_AUTH}/contact/search`, payload, config);
        // Assuming that the API will return search results in response.data
        return response.data;  // Return API response (e.g., list of prospects)
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "An error occurred during the search.";
        throw new Error(errorMessage);
    }
};
