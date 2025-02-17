import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { getProspect } from "../hooks/authService"; // Import the service function
import DashboardLayout from '../components/MainLayout';
import { useNavigate } from "react-router-dom";
import Messageface from "../components/Messageface";

const ProspectList = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Example for logout, if needed
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // Function to fetch prospects
  const fetchProspects = async () => {
    try {
      setLoading(true);
      const data = await getProspect();
      setProspects(data);
    } catch (err) {
      setError("Failed to fetch prospects.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch prospects on component mount
  useEffect(() => {
    fetchProspects();
  }, []);

  // Handle the refresh button
  const handleRefresh = () => {
    fetchProspects();
  };

  return (
    <DashboardLayout>
      <Messageface />
      {/* <ProspectContent 
        prospects={prospects}
        loading={loading}
        error={error}
        handleRefresh={handleRefresh}
      /> */}
    </DashboardLayout>
  );
};

export default ProspectList;
