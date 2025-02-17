import { useState, useEffect } from "react";
import { ChevronDown, Coins, Settings } from "lucide-react";
import { getUsers } from "../../hooks/authService.ts"; // Import updated getUsers function

const Header = (isCollapsed, toggleSidebar) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", coins: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data function
  const fetchUser = async () => {
    try {
      const userData = await getUsers(); // Fetch user data from API
      // console.log(userData)
      localStorage.setItem("UserData", JSON.stringify(userData));


      if (userData) {
        setUser(userData); // Set user data
      } else {
        console.error("User data is empty or undefined:", userData);
        setError("User data not available.");
      }
    } catch (err) {
      setError("Failed to load user data.");
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data every 1 minute (60,000 ms)
  useEffect(() => {
    fetchUser(); // Initial fetch when component mounts

    const interval = setInterval(() => {
      fetchUser();
    }, 30000); // Fetch every 30 second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 relative">
          {/* Search Input */}
        <div className="relative w-64">
          
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange} // Handle input change
          /> */}
          {/* <Search className="absolute left-3 top-2.5 text-gray-400" size={20} aria-hidden="true" /> */}
        </div>
      <div className="flex items-center space-x-6">
        {/* Coins Display */}
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors duration-200 w-20">
            <Coins size={25} className="text-gray-600" />
            <span className="absolute text-sm top-3 right-0 h-5 w-10 text-gray flex items-center justify-center">
              {loading ? "..." : user?.coins ?? 0}
            </span>
          </button>
        </div>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Settings size={20} className="text-gray-600" />
        </button>

        {/* User Profile */}
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
        >
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <img
                src="/src/assets/react.svg"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex items-center">
                <div className="mr-2">
                  <p className="text-sm font-medium text-gray-700">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || "email@example.com"}</p>
                </div>
                <ChevronDown size={16} className="text-gray-600" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && !loading && !error && (
        <div className="absolute right-6 mt-45 w-48 bg-white shadow-lg rounded-md p-2 z-50">
          <ul>
            <li>
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Profile
              </a>
            </li>
            <li>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Settings
              </a>
            </li>
            <li>
              <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
