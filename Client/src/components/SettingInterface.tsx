import React, { useState } from 'react';
import ProfileEdit, { ProfileData } from './ProfileComponent';
import MailsConnect from './MailsConnectInterface';
import ConnectsUI from './ConnectsUI';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("myprofile"); // Default active tab

  const tabs = [
    { id: "myprofile", label: "My Profile" },
    { id: "mails", label: "Mails Connect" },
    { id: "integration", label: "Integrations" },
  ];

  const handleSaveProfile = async (profileData: ProfileData): Promise<void> => {
    try {
      // Implement your save logic here
      console.log('Saving profile data:', profileData);
      // Example: await api.updateProfile(profileData);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw new Error('Failed to save profile');
    }
  };

  const handleCancelEdit = (): void => {
    // Handle cancel action - perhaps switch to another tab or show a confirmation
    console.log('Edit cancelled');
  };

  // Define content for each tab with proper typing
  const tabContent: Record<string, React.ReactNode> = {
    myprofile: <ProfileEdit 
                  onSave={handleSaveProfile} 
                  onCancel={handleCancelEdit} 
                />,
    profile: <div className="text-sm text-gray-600">Users content goes here.</div>,
    mails: <MailsConnect/>,
    integration: <ConnectsUI/>,
  };

  return (
    <div className="flex gap-12 max-w-4xl font-[sans-serif]">
      {/* Sidebar */}
      <ul className="min-w-[230px] bg-gray-100 inline-block py-3">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab flex items-center text-sm py-2 px-3 cursor-pointer transition-all ${
              activeTab === tab.id ? "font-semibold bg-white text-blue-600" : "text-gray-800 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Content Section */}
      <div className="max-w-2xl mt-0 min-w-[900px]  w-full">
        <div className="mt-4">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default UserSettings;