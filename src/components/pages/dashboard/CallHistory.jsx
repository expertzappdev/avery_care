import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CallHistoryTable from "./CallHistoryTable";
import { fetchScheduledCallsRequest, clearCallMessages } from "../../../redux/callSlice.js";
import { toast } from "react-toastify";

export default function CallHistory() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { scheduledCalls, loading, error, message } = useSelector(
    (state) => state.call
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchScheduledCallsRequest({ userId: user._id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(`❌ Error: ${error}`);
      dispatch(clearCallMessages());
    }
    if (message) {
      toast.success(`✅ ${message}`);
      dispatch(clearCallMessages());
    }
  }, [error, message, dispatch]);

  const allFetchedCallsArray = Object.values(scheduledCalls || {});

  const completedCallsForHistory = allFetchedCallsArray.filter(
    (call) => call.status === "completed"
  );

  // --- FIX APPLIED HERE ---
  const finalFilteredCalls = completedCallsForHistory.filter((call) => {
    // Format callDate for comparison
    const callDate = new Date(call.scheduledAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Safely check if aiSummary includes search term, OR if search term is empty
    const topicsMatch = 
      !search || // If search is empty, always match
      (call.aiSummary && call.aiSummary.toLowerCase().includes(search.toLowerCase())); // Otherwise, check if aiSummary exists and matches

    // Safely check if callDate includes dateFilter, OR if dateFilter is empty
    const dateMatch = 
      !dateFilter || // If dateFilter is empty, always match
      callDate.toLowerCase().includes(dateFilter.toLowerCase()); // Otherwise, check if callDate matches

    return topicsMatch && dateMatch;
  });
  // --- END FIX ---

  // // CONSOLE LOGS FOR DEBUGGING (can be removed after fix)
  // console.log("1. Raw scheduledCalls object from Redux:", scheduledCalls);
  // console.log("2. All fetched calls as Array:", allFetchedCallsArray);
  // console.log("3. Completed calls (after status filter):", completedCallsForHistory);
  // console.log("4. Final filtered calls (after search/date filters):", finalFilteredCalls);

  return (
    <div className="flex flex-col sm:px-10 lg:px-12 min-h-screen bg-white space-y-10">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Call History</h1>
        <p className="text-gray-500">View and search through your past AI health calls.</p>
      </div>

      {/* Search & Filter Section */}
      <div className="max-w-3xl w-full space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
          <input
            type="text"
            placeholder="Search by Keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-55 pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-green-300 transition"
          />
        </div>

        <input
          type="text"
          placeholder="Filter by Date (e.g. May)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-55 px-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-green-300 transition"
        />
      </div>

      {/* Reusable Table */}
      <div className="max-w-5xl w-full">
        {loading && finalFilteredCalls.length === 0 ? (
          <p className="text-gray-500">Loading call history...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <CallHistoryTable calls={finalFilteredCalls} />
        )}
        {!loading && !error && finalFilteredCalls.length === 0 && (
          <p className="text-gray-500 italic mt-4">
            No completed calls found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}