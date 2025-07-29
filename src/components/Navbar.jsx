import React, { useState } from 'react';

// SVG Icon for the hamburger menu
const MenuIcon = (props) => (
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


// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 px-4 sm:px-6 lg:px-10 py-3">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-4 text-[#101815]">
        <div className="w-8 h-8">
          {/* SVG Logo */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#101815] text-lg font-bold leading-tight tracking-[-0.015em]">AveryHealth</h2>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-[#101815] text-sm font-medium leading-normal hover:text-green-600 transition-colors" href="#">About</a>
          <a className="text-[#101815] text-sm font-medium leading-normal hover:text-green-600 transition-colors" href="#">Services</a>
          <a className="text-[#101815] text-sm font-medium leading-normal hover:text-green-600 transition-colors" href="#">Contact</a>
        </div>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] items-center justify-center rounded-full h-10 px-4 bg-[#3fbf81] text-[#101815] text-sm font-bold hover:bg-green-500 transition-colors">
            Sign In
          </button>
          <button className="flex min-w-[84px] items-center justify-center rounded-full h-10 px-4 bg-[#eaf1ed] text-[#101815] text-sm font-bold hover:bg-gray-200 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#101815]">
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white lg:hidden border-b border-gray-200 z-20">
          <div className="flex flex-col items-center gap-6 p-6">
            <a className="text-[#101815] text-base font-medium leading-normal" href="#">About</a>
            <a className="text-[#101815] text-base font-medium leading-normal" href="#">Services</a>
            <a className="text-[#101815] text-base font-medium leading-normal" href="#">Contact</a>
            <div className="flex flex-col gap-4 w-full items-center">
              <button className="flex w-full max-w-xs items-center justify-center rounded-full h-10 px-4 bg-[#3fbf81] text-[#101815] text-sm font-bold">
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

export default Navbar