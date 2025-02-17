import React, { useState } from 'react';
import { Menu, X, Bell, Search, Settings, ChevronDown, Home, BarChart2, Users, FileText, Mail, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// NavLink Component
const NavLinkComponent = ({ icon, title, path, isCollapsed }) => (
  <NavLink
    to={path}
    className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
    activeClassName="bg-gray-200 text-gray-900"
  >
    {icon}
    {!isCollapsed && <span className="ml-3">{title}</span>}
  </NavLink>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col w-64 bg-white shadow-md">
      {/* Collapse/Expand Button */}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-4">
        {isCollapsed ? <Menu /> : <X />}
      </button>

      {/* Sidebar Links */}
      <div className="space-y-2">
        <NavLinkComponent icon={<Home />} title="Home" path="/" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<BarChart2 />} title="Prospect" path="/myprospect" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<Users />} title="Users" path="/users" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<FileText />} title="Documents" path="/documents" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<Mail />} title="Messages" path="/messages" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<HelpCircle />} title="Help" path="/help" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<Bell />} title="Notifications" path="/notifications" isCollapsed={isCollapsed} />
        <NavLinkComponent icon={<Settings />} title="Settings" path="/settings" isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
