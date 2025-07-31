//   src/components/CallHistoryTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CallHistoryTable({ calls }) {
    const navigate = useNavigate();
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        {/*   Table Head */}
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Date</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Time</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base">Key Topics</th>
            <th className="py-3 px-4 font-medium text-sm sm:text-base"></th>
          </tr>
        </thead>

        {/*   Table Body */}
        <tbody>
          {calls.length > 0 ? (
            calls.map((call, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-sm sm:text-base">{call.date}</td>
                <td className="py-3 px-4 text-sm sm:text-base">{call.time}</td>
                <td className="py-3 px-4 text-sm sm:text-base">{call.topics}</td>
                <td className="py-3 px-4 text-[#3fbf81] font-medium cursor-pointer hover:underline text-sm sm:text-base" onClick={() => navigate("/call-details", { state: call })}>
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
