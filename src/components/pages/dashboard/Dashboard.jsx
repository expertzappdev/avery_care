import { useSelector } from "react-redux";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  FaceSmileIcon,
  FaceFrownIcon,
  BoltIcon,
  ExclamationCircleIcon,
  MinusCircleIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Mood Trend",
        data: [3, 4, 2, 5, 4, 3, 4],
        fill: true,
        backgroundColor: "rgba(63, 191, 129, 0.15)", // ✅ updated green tone
        borderColor: "#3fbf81", // ✅ updated line color
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: "#3fbf81", // ✅ updated point color
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ makes chart responsive
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: () => "transparent" },
        ticks: {
          padding: 20,
          font: { size: 14 },
        },
      },
      y: {
        min: 1,
        max: 5,
        ticks: {
          padding: 15,
          stepSize: 1,
          font: { size: 20, weight: "bold" },
          callback: (value) => ["☺", "☺", "☺", "☺", "☺"][value - 1],
        },
        grid: { color: () => "transparent" },
      },
    },
  };

  const moods = [
    { mood: "Happy", icon: <FaceSmileIcon className="w-5 h-5 text-yellow-500" /> },
    { mood: "Neutral", icon: <MinusCircleIcon className="w-5 h-5 text-gray-500" /> },
    { mood: "Sad", icon: <FaceFrownIcon className="w-5 h-5 text-blue-500" /> },
    { mood: "Anxious", icon: <ExclamationCircleIcon className="w-5 h-5 text-orange-500" /> },
    { mood: "Overwhelmed", icon: <BoltIcon className="w-5 h-5 text-red-500" /> },
  ];

  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 lg:px-12 space-y-12 pb-10">
      
      {/* ✅ Welcome Section */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome back, <span className="text-[#3fbf81]">{user?.name || "User"}!</span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg flex items-center gap-2 flex-wrap">
          <CalendarDaysIcon className="w-5 h-5 text-[#3fbf81]" />
          <span>
            Next Scheduled Call:{" "}
            <span className="text-[#3fbf81] font-semibold">
              Wednesday, July 10, 2024 at 2:00 PM
            </span>
          </span>
        </p>
      </div>

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#3fbf81] text-white font-medium rounded-full shadow hover:bg-[#36a973] transition w-full sm:w-auto text-sm">
          <PhoneIcon className="w-4 h-4" />
          Schedule a New Call
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#e6f8f0] text-[#3fbf81] font-medium rounded-full shadow hover:bg-[#d4f3e7] transition w-full sm:w-auto text-sm">
          <BoltIcon className="w-4 h-4" />
          Request an Immediate Call
        </button>
      </div>

      {/* ✅ Mood Tracker Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">How are you feeling today?</h2>
        <div className="flex flex-wrap gap-3">
          {moods.map(({ mood, icon }) => (
            <button
              key={mood}
              className="px-3 py-2 border border-gray-200 rounded-full hover:bg-[#f2faf6] transition flex items-center gap-2 text-sm shadow-sm"
            >
              {icon}
              <span>{mood}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Mood Trend Graph */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Mood Trend (Last 7 Days)</h2>
        <div className="w-full rounded-lg bg-white p-3 sm:p-5 h-[300px] sm:h-[400px] lg:h-[450px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
