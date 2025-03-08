import { Home, BarChart2, Users, FileText, Mail, HelpCircle, Menu, X, Search, LogsIcon, LogInIcon, MoveRight, Briefcase, Settings, Notebook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const navLinks = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { title: "My Prospects", icon: <BarChart2 size={20} />, path: "/myprospect" },
    { title: "Leads", icon: <Search size={20} />, path: "/search" },
    { title: "Clients", icon: <Briefcase size={20} />, path: "/clients" },
    { title: "Messages", icon: <Mail size={20} />, path: "/messages" },
    { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { title: "Email Markiting", icon: <Mail size={20} />, path: "/email-marketing" },
    { title: "Email Templates", icon: <Notebook size={20} />, path: "/email-templates" },
    
  ];

  return (
    <div
      className={`${isCollapsed ? "w-15" : "w-45"
        } transition-all duration-300 bg-white shadow-lg h-screen flex flex-col sidebarBg`}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4">
        <h1 className={`text-l font-bold text-white ${isCollapsed ? "hidden" : "block"}`}>
          Lead Sync
        </h1>
        <button onClick={toggleSidebar} className="p-2  text-white hover:bg-white-700">
          {isCollapsed ? <MoveRight size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-4 px-2 flex-1 text">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`flex items-center p-3  hover:bg-gray-700 ${location.pathname === link.path ? " font-semibold" : ""
              }`}
          >
            <span className="mr-3">{link.icon}</span>
            <span className={`${isCollapsed ? "hidden" : "block"} sidebariconText`}>
              {link.title}
            </span>

          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
