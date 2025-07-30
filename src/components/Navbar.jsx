import React, { useState } from "react";
import Logo from "../assets/AveryCareLogo1.png"; 

// SVG Icon for the hamburger menu
const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// SVG Icon for closing the menu
const XIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 px-4 sm:px-6 lg:px-10 py-3 bg-white shadow-md">
      {/* ✅ Logo and Brand Name */}
      <div className="flex items-center gap-3">
        <img src={Logo} alt="AveryCare Logo" className="w-10 h-10 object-contain" /> 
        <h2 className="text-[#101815] text-xl font-bold tracking-tight">AveryCare</h2>
      </div>

      {/* ✅ Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-[#101815] text-sm font-medium hover:text-green-600 transition-colors" href="#">About</a>
          <a className="text-[#101815] text-sm font-medium hover:text-green-600 transition-colors" href="#">Services</a>
          <a className="text-[#101815] text-sm font-medium hover:text-green-600 transition-colors" href="#">Contact</a>
        </div>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] items-center justify-center rounded-full h-10 px-4 bg-[#3fbf81] text-white text-sm font-bold hover:bg-green-500 transition-colors">
            Sign In
          </button>
          <button className="flex min-w-[84px] items-center justify-center rounded-full h-10 px-4 bg-[#eaf1ed] text-[#101815] text-sm font-bold hover:bg-gray-200 transition-colors">
            Sign Up
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#101815]">
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white lg:hidden border-b border-gray-200 z-20">
          <div className="flex flex-col items-center gap-6 p-6">
            <a className="text-[#101815] text-base font-medium" href="#">About</a>
            <a className="text-[#101815] text-base font-medium" href="#">Services</a>
            <a className="text-[#101815] text-base font-medium" href="#">Contact</a>
            <div className="flex flex-col gap-4 w-full items-center">
              <button className="flex w-full max-w-xs items-center justify-center rounded-full h-10 px-4 bg-[#3fbf81] text-white text-sm font-bold">
                Sign In
              </button>
              <button className="flex w-full max-w-xs items-center justify-center rounded-full h-10 px-4 bg-[#eaf1ed] text-[#101815] text-sm font-bold">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
