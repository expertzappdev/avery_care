import React from "react";
import { useNavigate } from "react-router-dom";

export default function CallHistoryTable({ calls }) {
  const navigate = useNavigate();

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB");
    } catch (e) {
      console.error("Invalid date string for formatDate:", dateStr, e);
      return "Invalid Date";
    }
  };

  // Format time
  const formatTime = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch (e) {
      console.error("Invalid date string for formatTime:", dateStr, e);
      return "Invalid Time";
    }
  };

  // AI Summary display
  const displayAiSummary = (aiSummaryValue) => {
    return aiSummaryValue || "No summary available";
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            {/* Name visible on all screens */}
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Name</th>
            {/* Date visible only on sm+ screens, hidden on smaller screens */}
            <th className="hidden sm:table-cell py-3 px-4 font-medium text-sm sm:text-base">Date</th>
            {/* Time and Key Topics visible only on sm+ screens */}
            <th className="hidden sm:table-cell py-3 px-4 font-medium text-sm sm:text-base">Time</th>
            <th className="hidden sm:table-cell py-3 px-4 font-medium text-sm sm:text-base">Key Topics</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base"></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {calls && calls.length > 0 ? (
            calls.map((call) => (
              <tr
                key={call._id}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
              >
                {/* Recipient Name */}
                <td className="py-3 px-4 text-sm sm:text-base">
                  {call.recipientName || "N/A"}
                </td>

                {/* Date - Hidden on small screens, visible on sm+ */}
                <td className="hidden sm:table-cell py-3 px-4 text-sm sm:text-base">
                  {formatDate(call.scheduledAt)}
                </td>

                {/* Time & Key Topics only on larger screens */}
                <td className="hidden sm:table-cell py-3 px-4 text-sm sm:text-base">
                  {formatTime(call.scheduledAt)}
                </td>
                <td className="hidden sm:table-cell py-3 px-4 text-sm sm:text-base">
                  {displayAiSummary(call.aiSummary)}
                </td>

                {/* View Details */}
                <td
                  className="py-3 px-4 text-[#3fbf81] font-medium cursor-pointer hover:underline text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => navigate("/call-details", { state: { callData: call } })}
                >
                  View Details
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5" // Changed colspan to 5 due to the new 'Name' column
                className="text-center py-6 text-gray-500 italic text-sm sm:text-base"
              >
                No calls found for the selected user.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}