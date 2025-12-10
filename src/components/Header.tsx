import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { logoutUser } from "../api/userApi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logoutUser();
    navigate("/signin");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white 
                 px-6 py-4 flex justify-between items-center shadow-lg"
    >
      <h1 className="text-xl font-bold text-red-500">Options Scalping</h1>

      <nav className="flex gap-6 items-center cursor-pointer scale-95">
        <Link
          to="/dashboard"
          className={`text-lg ${
            active === "/dashboard"
              ? "text-blue-400"
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/broker"
          className={`text-lg ${
            active === "/broker"
              ? "text-blue-400"
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          Broker
        </Link>

        <Link
          to="/logs"
          className={`text-lg ${
            active === "/logs"
              ? "text-blue-400"
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          Logs
        </Link>

        <div className="relative" ref={dropdownRef}>
          {/* Profile Circle */}
          <div
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center cursor-pointer"
          >
            <span className="text-white font-bold">U</span>
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
