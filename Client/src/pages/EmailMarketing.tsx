import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { getProspect } from "../hooks/authService"; // Import the service function
// import DashboardLayout from './Layout';
import DashboardLayout from '../components/MainLayout'

import { useNavigate } from "react-router-dom";
import  EmailMarketingInterface from "../components/EmailMarketingInterface";
const Dashboard = () => {
    const navigate = useNavigate();
  useContext(AuthContext);
  const [, setProspects] = useState([]);

  useEffect(() => {
    const fetchProspects = async () => {
      const data = await getProspect();
      setProspects(data);
    };

    fetchProspects();
  }, []);

  return (
    <DashboardLayout>
    <EmailMarketingInterface/>
  </DashboardLayout>
  );
};

export default Dashboard;
