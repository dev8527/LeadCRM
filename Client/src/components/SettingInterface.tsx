import React, { useState } from 'react';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("myprofile"); // Default active tab

  const tabs = [
    { id: "myprofile", label: "My Profile" },
    { id: "setting", label: "Settings" },
    { id: "profile", label: "Users" },
    { id: "inbox", label: "Inbox" },
    { id: "notification", label: "Notification" },
  ];

  const tabContent = {
    home: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.",
    setting: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu.",
    profile: "Lorem ipsum dolor sit amet, consectetur.",
    inbox: "Lorem ipsum dolor sit amet, consectetur dolor sit amet.",
    notification: "Lorem ipsum dolor sit amet.",
  };

  return (
    <div className="flex gap-12 max-w-4xl font-[sans-serif]">
      {/* Sidebar */}
      <ul className="min-w-[230px] bg-gray-100 inline-block py-5">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab flex items-center text-sm py-5 px-5 cursor-pointer transition-all ${
              activeTab === tab.id ? "font-semibold bg-white text-blue-600" : "text-gray-800 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Content Section */}
      <div className="max-w-2xl mt-8">
        <h4 className="text-lg font-bold text-gray-600">{tabs.find(tab => tab.id === activeTab)?.label}</h4>
        <p className="text-sm text-gray-600 mt-4">{tabContent[activeTab]}</p>
      </div>
    </div>
  );
};

export default UserSettings;
