// src/components/CallHistoryTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CallHistoryTable({ calls }) {
  const navigate = useNavigate();

  // Helper function to format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB"); // E.g., 13/08/2025
    } catch (e) {
        console.error("Invalid date string for formatDate:", dateStr, e);
        return 'Invalid Date';
    }
  };

  // Helper function to format time for display
  const formatTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour format
        }); // E.g., 14:03
    } catch (e) {
        console.error("Invalid date string for formatTime:", dateStr, e);
        return 'Invalid Time';
    }
  };

  // Helper to get AI Summary from call object's aiSummary property
  // Ab aiSummary saga mein hi ban raha hai, toh yahan direct use karenge.
  // Agar saga ne null ya undefined set kiya hai, toh 'No summary available' dikhega.
  const displayAiSummary = (aiSummaryValue) => {
    return aiSummaryValue || 'No summary available';
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Date</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Time</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Key Topics</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base"></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {calls && calls.length > 0 ? (
            calls.map((call) => (
              <tr
                key={call._id} // Use call._id as key for unique identification
                className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-sm sm:text-base">{formatDate(call.scheduledAt)}</td>
                <td className="py-3 px-4 text-sm sm:text-base">{formatTime(call.scheduledAt)}</td>
                {/* Yahan par changes hain: call.aiSummary ko use kiya hai */}
                <td className="py-3 px-4 text-sm sm:text-base">{displayAiSummary(call.aiSummary)}</td>
                <td
                  className="py-3 px-4 text-[#3fbf81] font-medium cursor-pointer hover:underline text-sm sm:text-base"
                  onClick={() => navigate("/call-details", { state: { callData: call } })} // Pass full call object for details
                >
                  View Details
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-gray-500 italic text-sm sm:text-base"
              >
                No calls found for the selected filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}