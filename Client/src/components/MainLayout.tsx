import { useState } from "react";
import Header from "./Header/Navbar";
// Import your custom Sidebar component, not from lucide-react
import Sidebar from "./Sidebar"; // Assuming you have a custom Sidebar component

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Custom Sidebar Component */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-y-auto p-5 ${isCollapsed ? 'ml-1' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
