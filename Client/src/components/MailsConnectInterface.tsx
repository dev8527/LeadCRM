import React, { useState } from "react";
import { Trash2, Plus, Send, Mail, Server, Lock, User, X, Edit, ChevronRight, ChevronDown } from "lucide-react";

export default function SMTPMailConnect() {
  const [smtpConfigs, setSmtpConfigs] = useState([
    { id: Date.now(), host: "smtp.gmail.com", port: "587", username: "example@gmail.com", password: "••••••••", encryption: "tls", status: "✅ Connected" },
  ]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [currentConfig, setCurrentConfig] = useState({
    id: null,
    host: "",
    port: "",
    username: "",
    password: "",
    encryption: "tls",
    status: ""
  });
  
  const [expandedRow, setExpandedRow] = useState(null);

  const handleChange = (e) => {
    setCurrentConfig({
      ...currentConfig,
      [e.target.name]: e.target.value
    });
  };

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const openAddPopup = () => {
    setCurrentConfig({
      id: Date.now(),
      host: "",
      port: "",
      username: "",
      password: "",
      encryption: "tls",
      status: ""
    });
    setEditingConfig(null);
    setShowPopup(true);
  };

  const openEditPopup = (config) => {
    setCurrentConfig({...config});
    setEditingConfig(config.id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const saveConfig = () => {
    if (editingConfig) {
      // Update existing config
      setSmtpConfigs(smtpConfigs.map(config => 
        config.id === editingConfig ? currentConfig : config
      ));
    } else {
      // Add new config
      setSmtpConfigs([...smtpConfigs, currentConfig]);
    }
    setShowPopup(false);
  };

  const removeConfig = (id) => {
    setSmtpConfigs(smtpConfigs.filter((config) => config.id !== id));
  };

  const testConnection = async (id) => {
    setSmtpConfigs((prevConfigs) =>
      prevConfigs.map((config) => (config.id === id ? { ...config, status: "Testing..." } : config))
    );

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, assume success
      setSmtpConfigs((prevConfigs) =>
        prevConfigs.map((config) =>
          config.id === id
            ? { ...config, status: "✅ Connection Successful!" }
            : config
        )
      );
    } catch (error) {
      setSmtpConfigs((prevConfigs) =>
        prevConfigs.map((config) =>
          config.id === id ? { ...config, status: "❌ Error connecting to SMTP Server!" } : config
        )
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-4 md:p-2 shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center mb-4 sm:mb-0">
        </div>
        <button
          onClick={openAddPopup}
          className="flex items-center justify-center bg-indigo-600 text-white py-1 px-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add 
        </button>
      </div>
      
      {/* Desktop View - Table */}
      <div className="hidden md:block mb-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Encryption</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {smtpConfigs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No SMTP configurations added yet. Click "Add SMTP" to create one.
                </td>
              </tr>
            ) : (
              smtpConfigs.map((config) => (
                <tr key={config.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Server className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{config.host}</div>
                      <div className="text-sm text-gray-500 ml-2">: {config.port}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{config.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {config.encryption.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      config.status.includes("✅") ? "text-green-600" : 
                      config.status.includes("❌") ? "text-red-600" : 
                      "text-gray-500"
                    }`}>
                      {config.status || "Not tested"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => testConnection(config.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Test Connection"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditPopup(config)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => removeConfig(config.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile View - Card Style */}
      <div className="md:hidden">
        {smtpConfigs.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">No SMTP configurations added yet.</p>
            <p className="text-sm text-gray-500">Click "Add SMTP" to create one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {smtpConfigs.map((config) => (
              <div key={config.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleRowExpand(config.id)}
                >
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">{config.host}:{config.port}</p>
                      <p className="text-sm text-gray-500">{config.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-2 text-sm ${
                      config.status.includes("✅") ? "text-green-600" : 
                      config.status.includes("❌") ? "text-red-600" : 
                      "text-gray-500"
                    }`}>
                      {config.status ? "✓" : ""}
                    </span>
                    {expandedRow === config.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedRow === config.id && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Encryption</p>
                        <p className="font-medium">{config.encryption.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className={`font-medium ${
                          config.status.includes("✅") ? "text-green-600" : 
                          config.status.includes("❌") ? "text-red-600" : 
                          "text-gray-500"
                        }`}>
                          {config.status || "Not tested"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          testConnection(config.id);
                        }}
                        className="flex items-center text-sm text-blue-600"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Test
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditPopup(config);
                        }}
                        className="flex items-center text-sm text-indigo-600"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeConfig(config.id);
                        }}
                        className="flex items-center text-sm text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal/Popup for adding or editing SMTP config */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {editingConfig ? "Edit SMTP Configuration" : "Add SMTP Configuration"}
              </h3>
              <button onClick={closePopup} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Server className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="host"
                    placeholder="e.g., smtp.gmail.com"
                    value={currentConfig.host}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
                <input
                  type="number"
                  name="port"
                  placeholder="e.g., 587"
                  value={currentConfig.port}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email address"
                    value={currentConfig.username}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={currentConfig.password}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                <div className="flex flex-wrap gap-4">
                  {["tls", "ssl", "none"].map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="encryption"
                        value={type}
                        checked={currentConfig.encryption === type}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{type.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
              <button
                onClick={closePopup}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={saveConfig}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {editingConfig ? "Save Changes" : "Add Configuration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}