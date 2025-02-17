import { useEffect } from "react";
import { Loader } from "lucide-react";  // Optional: For loading state icon

const ProspectContent = ({ prospects, loading, error, handleBulkExport }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Prospects</h2>

      {/* Loading or Error State */}
      {loading && (
        <div className="text-center py-6">
          <Loader className="animate-spin mx-auto text-blue-600" size={24} />
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      <div className="flex justify-between mb-6">
        <button
          onClick={handleBulkExport}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition duration-200 flex items-center gap-2"
        >
          <span>Bulk Export</span>
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border text-left">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="hidden peer"
                />
                <label
                  htmlFor="checkbox"
                  className="relative flex items-center justify-center p-2 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded-lg overflow-hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full fill-white"
                    viewBox="0 0 520 520"
                  >
                    <path
                      d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    />
                  </svg>
                </label>
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Company</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Contact Details</th>
              <th className="p-4 text-left text-sm font-semibold text-black">LinkedIn</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Twitter</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {prospects.length > 0 ? (
              prospects.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">
                    <input
                      type="checkbox"
                      className="hidden peer"
                    />
                  </td>
                  <td className="p-3 border">{p.name}</td>
                  <td className="p-3 border">{p.company}</td>
                  <td className="p-3 border">
                    {p.email} / {p.phone}
                  </td>
                  <td className="p-3 border">
                    {p.contact_details?.linkedin ? (
                      <a
                        href={p.contact_details.linkedin}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 border">
                    {p.contact_details?.twitter ? (
                      <a
                        href={`https://twitter.com/${p.contact_details.twitter.replace("@", "")}`}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.contact_details.twitter}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 border">{p.status || "N/A"}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => alert(`Viewing details for ${p.name}`)}
                      className="px-4 py-2 text-blue-600 border rounded-md hover:bg-blue-100 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="p-3 border text-center"
                  colSpan="8"
                >
                  No prospects available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProspectContent;
