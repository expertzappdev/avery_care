import React, { useState } from "react";
import {
  UserIcon,
  CalendarDaysIcon,
  ClockIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";

export default function ScheduleHealthCall() {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const familyMembers = ["Ethan Carter", "Sophia Carter", "Liam Carter"];

  const handleSchedule = () => {
    if (!selectedMember || !selectedDate || !selectedTime) {
      alert("⚠️ Please fill in all fields before scheduling.");
      return;
    }
    alert(`  Health Call Scheduled for ${selectedMember} on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <div className="flex flex-col px-5 sm:px-8 lg:px-12 pb-12 min-h-screen space-y-12">
      
      {/*   Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule Health Call</h1>
        <p className="text-gray-600">
          Schedule an <span className="text-[#3fbf81] font-semibold">AI-powered</span> health check call for a family member.
        </p>
      </div>

      {/*   Form Section */}
      <div className="max-w-2xl space-y-8">
        
        {/* Family Member Dropdown */}
        <div>
          <label className="font-medium mb-2 text-gray-700 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-[#3fbf81]" />
            Select Family Member
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] transition"
          >
            <option value="">Choose a family member</option>
            {familyMembers.map((member, index) => (
              <option key={index} value={member}>{member}</option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="font-medium mb-2 text-gray-700 flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5 text-[#3fbf81]" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] transition"
          />
        </div>

        {/* Time Picker */}
        <div>
          <label className="font-medium mb-2 text-gray-700 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-[#3fbf81]" />
            Select Time
          </label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] transition"
          />
        </div>

        {/*   Schedule Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSchedule}
            className="flex items-center gap-2 px-8 py-3 bg-[#3fbf81] text-white font-semibold rounded-full hover:bg-[#36a973] transition transform hover:scale-105"
          >
            <PhoneArrowUpRightIcon className="w-5 h-5" />
            Schedule Health Call
          </button>
        </div>
      </div>

      {/*   Call Preview Section */}
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Call Preview</h2>

        {/*   White Card Style */}
        <div className="border border-gray-200 rounded-xl bg-white p-6 space-y-5">
          
          {/* Member */}
          <div className="flex items-center gap-4">
            <div className="bg-[#eafaf3] p-3 rounded-full">
              <UserIcon className="w-7 h-7 text-[#3fbf81]" />
            </div>
            <p className="text-gray-700 text-lg">
              <strong>Family Member:</strong> {selectedMember || "Not selected"}
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-4">
            <div className="bg-[#eafaf3] p-3 rounded-full">
              <CalendarDaysIcon className="w-7 h-7 text-[#3fbf81]" />
            </div>
            <p className="text-gray-700 text-lg">
              <strong>Date:</strong> {selectedDate || "Not selected"}
            </p>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4">
            <div className="bg-[#eafaf3] p-3 rounded-full">
              <ClockIcon className="w-7 h-7 text-[#3fbf81]" />
            </div>
            <p className="text-gray-700 text-lg">
              <strong>Time:</strong> {selectedTime || "Not selected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
