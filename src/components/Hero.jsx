// Hero Component
import React from "react";
import bannerImage from "../assets/bannerimageHome.png";
const Hero = () => {
  return (
    // REMOVED bottom padding to reduce gap below
    <div className="px-4 sm:px-6 lg:px-5 pt-10 sm:pt-13 md:pt-15">
      <div className="layout-content-container flex flex-col max-w-6xl mx-auto">
        <div className="@container">
          <div className="w-full">
            <div
              className="flex min-h-[480px] md:min-h-[520px] flex-col gap-6 bg-center bg-no-repeat rounded-2xl items-center justify-center p-6 sm:p-8 text-center"
              style={{
                backgroundColor: "rgb(57, 167, 158)",
                backgroundImage: `url(${bannerImage})`,
              }}
            >
              <div className="flex flex-col gap-4 max-w-3xl mt-20">
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
                  Your AI-Powered Healthcare Companion
                </h1>
                <h2 className="text-white/90 text-base sm:text-lg lg:text-xl font-normal max-w-2xl mx-auto">
                  AveryHealth provides supportive, AI-driven phone calls to help you manage your health and well-being. Schedule and conduct calls with ease.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4 justify-center">
                <button className="flex min-w-[120px] items-center justify-center rounded-full h-12 px-6 bg-[#3fbf81] text-[#101815] text-base font-bold hover:bg-green-500 transition-transform transform hover:scale-105">
                  Get Started
                </button>
                <button className="flex min-w-[120px] items-center justify-center rounded-full h-12 px-6 bg-[#eaf1ed] text-[#101815] text-base font-bold hover:bg-gray-200 transition-transform transform hover:scale-105">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero