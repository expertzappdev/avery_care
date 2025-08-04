import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CallHistoryTable from "./CallHistoryTable"

export default function CallHistory() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  //   Global calls (User + Family)
  const calls = [
    { date: "July 15, 2024", time: "10:00 AM", topics: "Stress Management, Sleep Improvement" },
    { date: "July 10, 2024", time: "2:30 PM", topics: "Nutrition, Exercise" },
    { date: "July 5, 2024", time: "11:45 AM", topics: "Mental Wellness, Mindfulness" },
    { date: "June 28, 2024", time: "4:15 PM", topics: "Goal Setting, Productivity" },
    { date: "June 20, 2024", time: "9:00 AM", topics: "Healthy Habits, Work-Life Balance" },
  ];

  //   Filtered list (search + date)
  const filteredCalls = calls.filter(
    (call) =>
      call.topics.toLowerCase().includes(search.toLowerCase()) &&
      (dateFilter ? call.date.includes(dateFilter) : true)
  );

  return (
    <div className="flex flex-col sm:px-10 lg:px-12 min-h-screen bg-white space-y-10">
      {/*   Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Call History</h1>
        <p className="text-gray-500">View and search through your past AI health calls.</p>
      </div>

      {/*   Search & Filter Section */}
      <div className="max-w-3xl w-full space-y-4">
        {/*  Search bar */}
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

        {/*  Date Filter */}
        <input
          type="text"
          placeholder="Filter by Date (e.g. July)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-55 px-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-green-300 transition"
        />
      </div>

      {/*   Reusable Table */}
      <div className="max-w-5xl w-full">
        <CallHistoryTable calls={filteredCalls} />
      </div>
    </div>
  );
}
