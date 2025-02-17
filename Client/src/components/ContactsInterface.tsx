import React, { useState } from "react";
import { Loader, Download, Search, Filter, MoreHorizontal, ExternalLink, Mail, Phone, View, Eye } from "lucide-react";

const ContactInterface = ({ prospects, loading, error, handleBulkExport }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for preview
  const sampleProspects = prospects && prospects.length > 0 ? prospects : [
    {
      _id: "1",
      name: "Sarah Johnson",
      company: "TechGrowth Inc.",
      email: "sarah@techgrowth.com",
      phone: "555-123-4567",
      contact_details: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "@sarahj"
      },
      status: "Contacted"
    },
    {
      _id: "2",
      name: "Michael Chen",
      company: "Innovate Solutions",
      email: "mchen@innovatesolutions.com",
      phone: "555-987-6543",
      contact_details: {
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: null
      },
      status: "Qualified"
    }
  ];

  const displayProspects = sampleProspects;
  
  return (
    
      <div className="container mx-auto p-6">
       

        {/* Loading or Error State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <Loader className="animate-spin mx-auto text-blue-600" size={32} />
            <p className="text-gray-500 mt-4 text-lg">Loading your prospects...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-l-4 border-red-500">
            <p className="text-red-500 font-medium text-lg">{error}</p>
            <p className="text-gray-500 mt-2">Please try again or contact support</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between mb-6">
              <div className="relative flex-grow max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search prospects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  className="px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200 flex items-center gap-2"
                >
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
                
                <button
                  onClick={handleBulkExport}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition duration-200 flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Prospects Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th scope="col" className="pl-6 py-4">
                        <div className="flex items-center">
                          <input
                            id="select-all"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Social
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {displayProspects.length > 0 ? (
                      displayProspects.map((prospect) => (
                        <tr key={prospect._id} className="hover:bg-gray-50 transition-colors">
                          <td className="pl-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                {prospect.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{prospect.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm text-gray-500">
                                <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{prospect.email}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{prospect.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {prospect.contact_details?.linkedin && (
                                <a
                                  href={prospect.contact_details.linkedin}
                                  className="text-blue-600 hover:text-blue-800"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div className="p-2 bg-blue-50 rounded-full">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                  </div>
                                </a>
                              )}
                              {prospect.contact_details?.twitter && (
                                <a
                                  href={`https://twitter.com/${prospect.contact_details.twitter.replace("@", "")}`}
                                  className="text-blue-400 hover:text-blue-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div className="p-2 bg-blue-50 rounded-full">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                  </div>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${prospect.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 
                                prospect.status === 'Qualified' ? 'bg-green-100 text-green-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {prospect.status || "New"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <span
                                onClick={() => alert(`Viewing details for ${prospect.name}`)}
                                className="px-3 py-2 transition-colors"
                              >
                                <Eye size={16}/>
                              </span>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100">
                                <MoreHorizontal size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <div className="p-4 bg-gray-100 rounded-full mb-4">
                              <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-900">No prospects found</p>
                            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{displayProspects.length}</span> of{" "}
                      <span className="font-medium">{displayProspects.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div> 
            </div>
          </>
        )}
      </div>
  );
};

export default ContactInterface;
