import axios from 'axios';

// API URL (use environment variable in production)
const API_URL = 'http://localhost:5000';  // Default to local if no env variable
const API_URL_AUTH = 'http://localhost:5000/api/';  // Default to local if no env variable

// Register user function
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { activationToken } = response.data;

    // Store the activationToken in localStorage
    if (activationToken) {
      localStorage.setItem("activationToken", activationToken);
    }

    return response.data;  // Return API response
  } catch (error: any) {
    // Ensure error handling is safe for missing response
    const errorMessage = error.response?.data || error.message || "An error occurred during registration.";
    throw new Error(errorMessage);
  }
};

// Verify email function
export const verifyEmail = async (activationCode: { activation_code: string }) => {
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
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message || "An error occurred during email verification.";
    throw new Error(errorMessage);
  }
};

// Login user function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Ensure response contains a token or appropriate object structure
    if (response.data && response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      return response.data;  // Return user data or token
    } else {
      throw new Error("Login failed: Invalid response from server.");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message || "An error occurred during login.";
    throw new Error(errorMessage);
  }
};

// Get prospect function
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
  } catch (error: any) {
    console.error("Error fetching prospects:", error.response ? error.response.data : error.message);
    return [];
  }
};
//get Users
export const getUsers = async () => {
  try {
    const activationToken = localStorage.getItem("authToken");

    if (!activationToken) {
      throw new Error("No activation token found.");
    }

    const config = {
      headers: { Authorization: `Bearer ${activationToken}` }
    };

    const response = await axios.post(`${API_URL}/get-user`, config);
    // Ensure the response contains an array with at least one user object
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const userData = response.data[0]; // Extract the first user object

      // Return only required fields
      return {
        name: userData.name,
        email: userData.email,
        coins: userData.coins,
      };
    } else {
      console.error("Unexpected response format or empty data:", response.data);
      return null; // Return null instead of an empty array
    }
  } catch (error: any) {
    console.error("Error fetching user:", error.response ? error.response.data : error.message);
    return null;
  }
};
