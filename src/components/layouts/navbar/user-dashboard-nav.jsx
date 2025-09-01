import { useState, useRef, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaSignOutAlt, FaBell } from "react-icons/fa";

function DashboardNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications] = useState(3); // example: 3 unread
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = { firstName: "John", lastName: "Doe" };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-50 md:px-6 md:py-4 py-3 px-3 flex items-center justify-between fixed top-0 left-0 w-full z-50 shadow">
      <div></div>
      <NavLink to="/dashboard" className="flex items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-600 cursor-pointer">
          <FaCreditCard />
          KC Payment
        </div>
      </NavLink>

      {/* Right Section */}
      <div className="flex items-center space-x-6 relative">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-lg" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* User Avatar */}
        <div
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            round={true}
            size="28"
            color="#4F46E5"
            textSizeRatio={2}
          />
        </div>

        {/* Dropdown Modal */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default DashboardNavbar;
