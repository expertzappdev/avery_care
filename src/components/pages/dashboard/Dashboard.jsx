import { useSelector } from "react-redux";
import React from "react";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name || "User"}!</h1>
      <p className="text-gray-600 mb-6">
        Next Scheduled Call: <span className="text-green-600 font-semibold">Wednesday, July 10, 2024 at 2:00 PM</span>
      </p>

      <div className="flex gap-4 mb-8">
        <button className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
          Schedule a New Call
        </button>
        <button className="px-5 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
          Request an Immediate Call
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">Mood Tracker</h2>
      <div className="flex gap-3 mb-6">
        {["Happy", "Neutral", "Sad", "Anxious", "Overwhelmed"].map((mood) => (
          <button key={mood} className="px-4 py-2 border rounded-full hover:bg-green-50">{mood}</button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Mood Trend (Last 7 Days)</h2>
      <div className="w-full h-40 bg-green-50 rounded-lg flex items-center justify-center text-gray-400">
        📊 Mood Chart Coming Soon
      </div>
    </div>
  );
}
