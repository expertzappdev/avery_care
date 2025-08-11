import { useDispatch, useSelector } from "react-redux";
import { scheduleHealthCallRequest } from "../../../redux/callSlice";
import { toast } from "react-toastify";
import React from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Emojis top-to-bottom (Happy → Overwhelmed)
  const moodEmojis = ["😀︎", "😐︎", "😢︎", "😟︎", "😫︎"];

  // Dummy data for the mood chart
  // You can replace this with real data from your backend.
  // The y-axis values correspond to the moodEmojis array index (e.g., 1 = 😀︎, 5 = 😫︎).
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Mood Trend",
        data: [5, 2, 3, 4, 5, 2, 1],
        fill: true,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderColor: "#3fbf81",
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: "#3fbf81",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: () => "transparent" },
        ticks: {
          padding: 10,
          font: { size: 14 },
        },
      },
      y: {
        min: 1,
        max: 5,
        reverse: true, // Happy sabse upar
        ticks: {
          padding: 10,
          stepSize: 1,
          font: { size: 20 },
          callback: (value) => moodEmojis[value - 1],
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

  const handleSelfCall = () => {
    if (!user?._id) {
      alert("User ID not found! Please login again.");
      return;
    }
try{
dispatch(
      scheduleHealthCallRequest({
        scheduledTo: user._id, // ✅ apna khud ka ID
        scheduledAt: new Date().toISOString(), // ✅ abhi ka time
      })
    )
     toast.success("Call scheduled successfully! 📞");
  }
 
catch (error) {
      toast.error(error?.message || "Failed to schedule call ❌");
    }
  }
    

  return (
    <div className="bg-white min-h-screen sm:px-8 lg:px-12 space-y-12 pb-12">
      
      {/* Welcome Section */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome back, <span className="text-[#3fbf81]">{user?.name || "User"}!</span>
        </h1>
        <p className="text-gray-700 text-base sm:text-lg flex items-center gap-2 flex-wrap">
          <CalendarDaysIcon className="w-5 h-5 text-[#3fbf81]" />
          <span>
            Next Scheduled Call:{" "}
            <span className="text-[#3fbf81] font-semibold">
              Not any call scheduled
            </span>
          </span>
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button onClick={() => navigate('/schedule')} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#3fbf81] text-white font-medium rounded-full shadow hover:bg-[#36a973] transition w-full sm:w-auto text-sm">
          <PhoneIcon className="w-4 h-4" />
          Schedule a New Call
        </button>
        <button onClick={handleSelfCall} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#e6f8f0] text-[#3fbf81] font-medium rounded-full shadow hover:bg-[#d4f3e7] transition w-full sm:w-auto text-sm">
          <BoltIcon className="w-4 h-4" />
          Request an Immediate Call
        </button>
      </div>

      {/* Mood Tracker Section */}
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

      {/* Mood Trend Graph */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Mood Trend (Last 7 Days)</h2>
        <div className="w-full sm:w-200 rounded-lg bg-white p-3 sm:p-5 h-[300px] sm:h-[400px] lg:h-[450px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
