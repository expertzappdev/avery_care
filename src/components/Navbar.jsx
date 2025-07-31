import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import Logo from "../assets/AveryCareLogo1.png";

import { QuestionMarkCircleIcon, CheckBadgeIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  //   Dummy user info (replace with redux data later)
  const userEmail = "anuj@example.com";
  const userPhone = "+91 9876543210";

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="relative flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-3 bg-white shadow-md">

      {/*   Logo */}
      <Link
        to={ "/"}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img src={Logo} alt="AveryCare Logo" className="w-10 h-10 object-contain" />
        <h2 className="text-[#101815] text-xl font-bold hover:text-[#34a06c] transition-colors">
          AveryCare
        </h2>
      </Link>

      {/*   Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
        {isAuthenticated ? (
          <>
            <Link className="text-[#101815] hover:text-[#34a06c]" to="/dashboard">Dashboard</Link>
            <Link className="text-[#101815] hover:text-[#34a06c]" to="/history">All Calls</Link>
            <Link className="text-[#101815] hover:text-[#34a06c]" to="/settings">Settings</Link>

            {/*   Help Icon */}
            <button className="text-[#101815] hover:text-[#34a06c]">
              <QuestionMarkCircleIcon className="w-6 h-6" />
            </button>

            {/*   Profile Dropdown */}
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#3fbf81] flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#34a06c] transition"
              >
                U
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-[210px] bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4 text-left space-y-3">

                  {/*   My Info Heading with underline */}
                  <div>
                    <h3 className="text-sm font-semibold ml-2 text-gray-800 ">My Info</h3>
                    <div className="w-full border-b border-gray-300 mt-2"></div>
                  </div>

                  {/*   Email */}
                  <div className="flex items-center ml-2 gap-2 text-gray-700 text-sm">
                    <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                    <span>{userEmail}</span>
                  </div>

                  {/*   Phone */}
                  <div className="flex items-center ml-2 gap-2 text-gray-700 text-sm">
                    <PhoneIcon className="w-4 h-4 text-gray-500" />
                    <span>{userPhone}</span>
                  </div>

                  {/*   Verified Badge */}
                  <div className="flex items-center ml-2 gap-1 text-green-600 text-xs font-medium">
                    <CheckBadgeIcon className="w-4 h-4" />
                    <span>Verified</span>
                  </div>

                  {/*   Logout */}
                  <button
                    onClick={handleLogout}
                    className="bg-[#3FBF81] hover:bg-[#36a973] text-white px-4 py-2 rounded-md text-sm ml-2 font-medium cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/*   Guest Navigation */}
            <Link className="text-[#101815] hover:text-[#34a06c]" to="/">About</Link>
            <Link className="text-[#101815] hover:text-[#34a06c]" to="/">Services</Link>
            <Link className="text-[#101815] hover:text-[#34a06c]" to="/">Contact</Link>

            <div className="flex gap-2">
              {!isLoginPage && (
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-full h-9 px-4 bg-[#3fbf81] text-white text-sm font-bold hover:bg-[#34a06c] transition"
                >
                  Sign In
                </Link>
              )}
              {!isSignupPage && (
                <Link
                  to="/signup"
                  className="flex items-center justify-center rounded-full h-9 px-4 bg-[#eaf1ed] text-[#101815] text-sm font-bold hover:bg-gray-200 transition"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/*   Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/*   Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-14 right-4 w-[220px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col gap-2 lg:hidden text-left">
          {isAuthenticated ? (
            <>
              {/*   My Info Heading with underline */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800">My Info</h3>
                <div className="w-fit border-b-2 border-gray-300 mt-2"></div>
              </div>

              {/*   Email */}
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                <span>{userEmail}</span>
              </div>

              {/*   Phone */}
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <PhoneIcon className="w-4 h-4 text-gray-500" />
                <span>{userPhone}</span>
              </div>

              {/*   Verified Badge */}
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <CheckBadgeIcon className="w-4 h-4" />
                <span>Verified</span>
              </div>

              {/*   Links */}
              <Link className="text-[#101815] hover:text-[#34a06c] mt-2" to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link className="text-[#101815] hover:text-[#34a06c]" to="/history" onClick={() => setIsMenuOpen(false)}>All Calls</Link>
              <Link className="text-[#101815] hover:text-[#34a06c]" to="/settings" onClick={() => setIsMenuOpen(false)}>Settings</Link>

              {/*   Logout */}
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="bg-[#3FBF81] hover:bg-[#36a973] text-white px-4 py-2 rounded-md text-sm mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-[#101815] hover:text-[#34a06c]" to="/" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link className="text-[#101815] hover:text-[#34a06c]" to="/" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link className="text-[#101815] hover:text-[#34a06c]" to="/" onClick={() => setIsMenuOpen(false)}>Contact</Link>

              {/*   Conditional Sign In/Sign Up buttons */}
              {!isLoginPage && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-[#3fbf81] text-white rounded-full px-3 py-1 text-center hover:bg-[#34a06c] mt-2">
                  Sign In
                </Link>
              )}
              {!isSignupPage && (
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-[#eaf1ed] text-[#101815] rounded-full px-3 py-1 text-center hover:bg-gray-200">
                  Sign Up
                </Link>
              )}
            </>
          )}
        </div>
      )}

    </header>
  );
};

export default Navbar;
