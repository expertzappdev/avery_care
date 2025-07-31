import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlayCircleIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function CallDetails() {
  const { state: call } = useLocation();
  const navigate = useNavigate();

  // ✅ Temporary Dummy Data
  const [callData, setCallData] = useState({
    date: "October 24, 2024",
    time: "10:00 AM",
    summary:
      "The call with Sarah was positive and focused on her progress with the new medication. She reported feeling more energetic and experiencing fewer side effects. The conversation also touched on her upcoming doctor’s appointment and strategies for managing stress at work.",
    topics: [
      "Medication progress",
      "Upcoming doctor’s appointment",
      "Stress management",
    ],
    actions: ["Schedule follow-up call", "Prepare questions for doctor"],

    // ✅ Call Recordings with date + time + duration
    recordings: [
      {
        id: 1,
        title: "Morning Check-in",
        date: "July 30, 2024",
        time: "10:00 AM",
        duration: "5:30",
        url: "#",
      },
      {
        id: 2,
        title: "Follow-up Discussion",
        date: "August 5, 2024",
        time: "03:45 PM",
        duration: "3:45",
        url: "#",
      },
      {
        id: 3,
        title: "Doctor Prep Talk",
        date: "August 15, 2024",
        time: "11:15 AM",
        duration: "7:10",
        url: "#",
      },
    ],
    transcript: [
      { time: "10:00 AM", text: "Hello Sarah, how are you feeling today?" },
      { time: "10:02 AM", text: "I’m doing much better, thank you!" },
      { time: "10:05 AM", text: "That’s great to hear. Have you noticed any side effects?" },
      { time: "10:07 AM", text: "Just a little tiredness, but it’s manageable." },
      { time: "10:10 AM", text: "Do you have any questions for your upcoming doctor’s appointment?" },
      { time: "10:12 AM", text: "I need to prepare a list. I’ll also discuss my stress levels at work." },
    ],
  });

  // ✅ Agar call history se data aaya ho to overwrite karega
  useEffect(() => {
    if (call) {
      setCallData((prev) => ({
        ...prev,
        ...call,
        topics: Array.isArray(call.topics) ? call.topics : prev.topics,
        actions: Array.isArray(call.actions) ? call.actions : prev.actions,
        recordings: Array.isArray(call.recordings) ? call.recordings : prev.recordings,
        transcript: Array.isArray(call.transcript) ? call.transcript : prev.transcript,
      }));
    }
  }, [call]);

  return (
    <div className="ml-8 min-h-screen bg-white">
      
      {/* ✅ Breadcrumb */}
      <p className="text-sm text-gray-500">
        Calls / <span className="text-gray-700 font-medium">Call Details</span>
      </p>

      {/* ✅ Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Call Details
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {callData.date} • {callData.time}
      </p>

      {/* ✅ AI Summary Section */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-[#3fbf81]" />
          AI-Powered Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{callData.summary}</p>
      </section>

      {/* ✅ Actionable Insights */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <ClipboardDocumentListIcon className="w-5 h-5 text-[#3fbf81]" />
          Actionable Insights
        </h2>

        {/* ✅ Topics */}
        <div className="mb-4">
          <h3 className="text-gray-700 font-medium mb-1">Key Topics Discussed</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {(callData.topics || []).map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* ✅ Actions */}
        <div>
          <h3 className="text-gray-700 font-medium mb-1">Action Items Mentioned</h3>
          <ul className="space-y-1">
            {(callData.actions || []).map((action, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircleIcon className="w-5 h-5 text-[#3fbf81]" /> {action}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ✅ MULTIPLE RECORDINGS SECTION */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <PlayCircleIcon className="w-5 h-5 text-[#3fbf81]" />
          Call Recordings
        </h2>

        <div className="space-y-3">
          {(callData.recordings || []).map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 rounded-lg"
            >
              <div className="mb-2 sm:mb-0">
                <h4 className="text-gray-800 font-medium">{rec.title}</h4>
                <p className="text-gray-500 text-sm">
                  {rec.date} • {rec.time} • {rec.duration} min
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#3fbf81] text-white rounded-full hover:bg-[#36a973] transition">
                <PlayCircleIcon className="w-6 h-6" />
                Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Transcript Section */}
      <section className="mb-10">
        <h3 className="text-gray-700 font-medium mb-2">Call Transcript (Latest Call)</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-700 text-sm leading-relaxed max-h-[300px] overflow-y-auto">
          {(callData.transcript || []).map((line, i) => (
            <p key={i} className="mb-2">
              <span className="font-medium text-gray-900">{line.time}:</span> {line.text}
            </p>
          ))}
        </div>
      </section>

      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-[#3fbf81] text-white rounded-full hover:bg-[#36a973] transition"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Call History
      </button>
    </div>
  );
}
