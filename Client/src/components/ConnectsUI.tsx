import React, { useState } from "react";
import { Linkedin, Mail, Phone, Crown, Slack, Twitter, X } from "lucide-react";

const prospects = [
  {
    id: 1,
    name: "John Doe",
    linkedin_url: "https://linkedin.com/in/johndoe",
    integrations: { email: true, phone: true, slack: false, twitter: true },
  },
  {
    id: 2,
    name: "Jane Smith",
    linkedin_url: "",
    integrations: { email: false, phone: true, slack: true, twitter: false },
  },
];

const integrationIcons = {
  linkedin: { icon: <Linkedin size={20} />, color: "blue", credits: 0 },
  email: { icon: <Mail size={20} />, color: "green", credits: 1 },
  phone: { icon: <Phone size={20} />, color: "yellow", credits: 1 },
  slack: { icon: <Slack size={20} />, color: "purple", credits: 2 },
  twitter: { icon: <Twitter size={20} />, color: "blue", credits: 1 },
  premium: { icon: <Crown size={20} />, color: "gold", credits: 3 },
};

export default function ConnectsUI() {
  const [selectedProspect, setSelectedProspect] = useState(null);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Integrations Connect</h2>
      <table className="min-w-full bg-white border shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((prospect) => (
            <tr key={prospect.id} className="border-b">
              <td className="px-4 py-4">{prospect.name}</td>
              <td className="px-4 py-4 text-center">
                <button
                  onClick={() => setSelectedProspect(prospect)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Connect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {selectedProspect && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedProspect.name} - Connections</h3>
              <button onClick={() => setSelectedProspect(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {/* LinkedIn */}
              <div className="flex items-center gap-3">
                {selectedProspect.linkedin_url ? (
                  <a
                    href={selectedProspect.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-md"
                  >
                    <Linkedin size={20} />
                    Connect on LinkedIn
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-gray-400 px-3 py-2 rounded-md">
                    <Linkedin size={20} />
                    No LinkedIn Available
                  </span>
                )}
              </div>

              {/* Other Integrations */}
              {Object.entries(selectedProspect.integrations).map(([key, available]) =>
                available ? (
                  <button
                    key={key}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md bg-${integrationIcons[key]?.color}-100 text-${integrationIcons[key]?.color}-700 w-full`}
                  >
                    {integrationIcons[key]?.icon}
                    Connect via {key.charAt(0).toUpperCase() + key.slice(1)} (Consumes {integrationIcons[key]?.credits} Credits)
                  </button>
                ) : (
                  <button
                    key={key}
                    disabled
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-200 text-gray-400 w-full cursor-not-allowed"
                  >
                    {integrationIcons[key]?.icon}
                    {key.charAt(0).toUpperCase() + key.slice(1)} Not Available
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
