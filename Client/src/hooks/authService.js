import axios from 'axios';

// Use environment variable for API URL
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';  // Default to local if no env variable


const API_URL = 'http://localhost:5000';  // Default to local if no env variable

const API_URL_AUTH = 'http://localhost:5000/api/';  // Default to local if no env variable
// Register user function
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { activationToken } = response.data;

    // Store the activationToken in localStorage
    if (activationToken) {
      localStorage.setItem("activationToken", activationToken);
    }
    return response.data;  // Return API response
  } catch (error) {
    throw error.response?.data || error.message;  // Handle errors
  }
};


// Express example
// Verify email function
export const verifyEmail = async (activationCode) => {
    try {
      // Get activation token from localStorage
      const activationToken = localStorage.getItem("activationToken");
  
      if (!activationToken) {
        throw new Error("No activation token found.");
      }
   
      // Prepare the payload
      const payload = {
        activation_code: activationCode.activation_code,
        activation_token: activationToken,
      };
  
      // Make the API request to verify the email
      const response = await axios.post(`${API_URL}/activate-user`, payload);
  
      return response.data;  // Return API response
    } catch (error) {
      throw error.response?.data || error.message;  // Handle errors
    }
  };


// Login user function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    // Check if login was successful
    if (response) {
      // Store the token in localStorage (for example)
      localStorage.setItem("authToken", response.token);

      // You can return the response or just the token
      return response;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    // Handle errors (network, validation, etc.)
    throw error.response?.data || error.message;
  }
};

//get prospect

export const getProspect = async () => {
    try {
        const activationToken = localStorage.getItem("authToken");

        if (!activationToken) {
            throw new Error("No activation token found.");
        }

        const payload = {
            user_id: "67a712cf8e946fc09f9ac479"
        };

        const config = {
            headers: { Authorization: `Bearer ${activationToken}` }
        };

        const response = await axios.post(`${API_URL_AUTH}contact/prospect-list`, payload, config);

        if (Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error("Unexpected response format:", response.data.data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching prospects:", error.response ? error.response.data : error.message);
        return [];
    }
};

  