import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { path: "/list-of-hotels", label: "Hotels" },
    // { path: "/guest", label: "Guests" },
   
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#F2F8FB] text-gray-900 p-4 h-[100px] flex justify-between items-center px-5 md:px-20 lg:px-[10%] shadow-lg">
      {/* Logo Section */}
      <h1 className="text-2xl font-bold">Logo</h1>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl focus:outline-none"
        >
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className={`lg:flex items-center space-x-6 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
        {/* Dashboard Link Based on Role */}
        {role === "MainAdmin" ? (
          <Link to="/Dashboard" className="text-lg hover:text-blue-500">
            Dashboard
          </Link>
        ) : (
          <Link to="/guest-Dashbord" className="text-lg hover:text-blue-500">
            Dashboard
          </Link>
        )}

        {/* Static Menu Links */}
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-lg hover:text-blue-500"
          >
            {item.label}
          </Link>
        ))}

        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="text-lg cursor-pointer hover:text-blue-500"
        >
          Logout
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-0 left-0 min-h-screen w-3/4 bg-[#F2F8FB] p-4 shadow-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Logo</h1>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl focus:outline-none"
          >
            &#10005; {/* Close icon */}
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col space-y-4">
          {role === "MainAdmin" ? (
            <Link
              to="/Dashboard"
              className="text-lg hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/guest-Dashbord"
              className="text-lg hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-lg hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div
            onClick={handleLogout}
            className="text-lg cursor-pointer hover:text-blue-500"
          >
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
