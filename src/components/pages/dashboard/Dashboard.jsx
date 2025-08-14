import { useDispatch, useSelector } from "react-redux";
import { scheduleHealthCallRequest, fetchScheduledCallsRequest } from "../../../redux/callSlice";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { scheduledCalls, loading: callsLoading, error: callsError } = useSelector(
    (state) => state.call
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchScheduledCallsRequest({ userId: user._id }));
    }
  }, [dispatch, user]);

  const findNextScheduledCall = () => {
    const allCallsArray = Object.values(scheduledCalls || {});
    const pendingCalls = allCallsArray.filter(call => call.status === 'pending');

    if (pendingCalls.length === 0) {
      return null;
    }

    pendingCalls.sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

    const nextCall = pendingCalls[0];

    const scheduledDate = new Date(nextCall.scheduledAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const scheduledTime = new Date(nextCall.scheduledAt).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return {
      recipientName: nextCall.recipientName,
      date: scheduledDate,
      time: scheduledTime,
    };
  };

  const nextScheduledCall = findNextScheduledCall();

  const moodEmojis = ["😀︎", "😐︎", "😢︎", "😟︎", "😫︎"];

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
        reverse: true,
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
      toast.error("User ID not found! Please login again. ❌");
      return;
    }
    dispatch(
      scheduleHealthCallRequest({
        scheduledTo: user._id,
        scheduledAt: new Date().toISOString(),
      })
    );
  };

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
            {callsLoading ? (
              <span className="text-gray-500 font-semibold">Loading...</span>
            ) : nextScheduledCall ? (
              <span className="text-[#3fbf81] font-semibold">
                {nextScheduledCall.recipientName === user?.name ? "Your call" : `${nextScheduledCall.recipientName}'s call`} on {nextScheduledCall.date} at {nextScheduledCall.time}
              </span>
            ) : (
              <span className="text-[#3fbf81] font-semibold">
                Not any call scheduled
              </span>
            )}
          </span>
        </p>
        {callsError && <p className="text-red-500 text-sm">Error loading calls: {callsError}</p>}
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
