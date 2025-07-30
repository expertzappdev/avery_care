import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";  // ✅ logout import kiya
import Logo from "../assets/AveryCareLogo1.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redux state se check karo user login hai ya nahi
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  // ✅ Logout Handler
  const handleLogout = () => {
    dispatch(logout());          // redux state clear
    navigate("/login");          // login page bhejo
  };

  return (
    <header className="relative flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-3 bg-white shadow-md">
      
      {/* ✅ Logo & Brand name */}
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 cursor-pointer">
        <img src={Logo} alt="AveryCare Logo" className="w-10 h-10 object-contain" /> 
        <h2 className="text-[#101815] text-xl font-bold hover:text-[#34a06c] transition-colors">
          AveryCare
        </h2>
      </Link>

      {/* ✅ Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-[#101815] hover:text-[#34a06c]" to="/">About</Link>
          <Link className="text-[#101815] hover:text-[#34a06c]" to="/">Services</Link>
          <Link className="text-[#101815] hover:text-[#34a06c]" to="/">Contact</Link>
        </div>

        {/* ✅ Buttons */}
        <div className="flex gap-2">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center rounded-full h-10 px-4 bg-red-500 text-white text-sm font-bold hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              {!isLoginPage && (
                <Link 
                  to="/login" 
                  className="flex items-center justify-center rounded-full h-10 px-4 bg-[#3fbf81] text-white text-sm font-bold hover:bg-[#34a06c]"
                >
                  Sign In
                </Link>
              )}
              {!isSignupPage && (
                <Link 
                  to="/signup" 
                  className="flex items-center justify-center rounded-full h-10 px-4 bg-[#eaf1ed] text-[#101815] text-sm font-bold hover:bg-gray-200"
                >
                  Sign Up
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu Button */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="focus:outline-none"
        >
          {isMenuOpen ? (
            // ✅ Cross Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // ✅ Hamburger Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ✅ Dropdown Menu (Mobile) */}
      <div
        className={`absolute top-14 right-4 w-[220px] bg-white rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start gap-4 p-5">
          {/* ✅ Links */}
          <Link className="text-[#101815] text-base font-medium hover:text-green-600 w-full" to="/" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link className="text-[#101815] text-base font-medium hover:text-green-600 w-full" to="/" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link className="text-[#101815] text-base font-medium hover:text-green-600 w-full" to="/" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          
          {/* ✅ Auth Buttons */}
          <div className="flex flex-col gap-3 w-full mt-2">
            {isAuthenticated ? (
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="flex items-center justify-center rounded-full h-10 px-4 bg-red-500 text-white text-sm font-bold hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                {!isLoginPage && (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded-full h-10 px-4 bg-[#3fbf81] text-white text-sm font-bold hover:bg-green-500 transition"
                  >
                    Sign In
                  </Link>
                )}
                {!isSignupPage && (
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded-full h-10 px-4 bg-[#eaf1ed] text-[#101815] text-sm font-bold hover:bg-gray-200 transition"
                  >
                    Sign Up
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
