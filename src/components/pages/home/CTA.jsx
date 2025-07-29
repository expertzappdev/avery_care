import React from "react";

const CTA = () => {
  return (
    <section className="flex justify-center py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6 px-4 text-center">
        <h1 className="text-[#101815] text-3xl sm:text-4xl font-bold leading-tight">
          Ready to experience the future of healthcare?
        </h1>
        <p className="text-[#101815] text-base sm:text-lg font-normal max-w-2xl">
          Join AveryCare today and take control of your health and well-being.
        </p>
        <div className="flex justify-center mt-4">
          <button className="flex min-w-[120px] items-center justify-center rounded-full h-12 px-6 bg-[#3fbf81] text-[#101815] text-base font-bold hover:bg-green-500 transition-transform transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};


export default CTA;
