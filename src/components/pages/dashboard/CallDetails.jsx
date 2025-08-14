import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlayCircleIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckCircleIcon,
  CalendarDaysIcon, // Added for consistency in formatting
  ClockIcon, // Added for consistency in formatting
} from "@heroicons/react/24/outline";

export default function CallDetails() {
  const { state } = useLocation(); // state object mein { callData: call } aayega
  const call = state?.callData; // Extract the call object from state
  const navigate = useNavigate();

  // Initial state ko backend se aaye data se populate karein
  // Agar 'call' object available nahi hai (e.g., direct URL access), toh default values use karein
  const [displayData, setDisplayData] = useState({
    recipientName: call?.recipientName || "N/A",
    scheduledAt: call?.scheduledAt || null, // Full ISO timestamp
    summary: call?.aiSummary || "No AI summary available for this call.", // Use aiSummary directly
    topics: call?.topics || [], // Assuming topics might come from backend later
    actions: call?.actions || [], // Assuming actions might come from backend later
    recordings: call?.recordings || [], // Assuming recordings might come from backend later
    transcript: call?.transcript || [], // Full transcript array from backend
    audioRecordingUrl: call?.audioRecordingUrl || null, // Backend recording URL
    durationInSeconds: call?.durationInSeconds || 0, // Duration in seconds
  });

  // Jab call prop change ho (new data arrives), state update karein
  useEffect(() => {
    if (call) {
      setDisplayData({
        recipientName: call.recipientName || "N/A",
        scheduledAt: call.scheduledAt || null,
        summary: call.aiSummary || "No AI summary available for this call.",
        topics: call.topics || [],
        actions: call.actions || [],
        recordings: call.recordings || [],
        transcript: call.transcript || [],
        audioRecordingUrl: call.audioRecordingUrl || null,
        durationInSeconds: call.durationInSeconds || 0,
      });
    }
  }, [call]);

  // Helper functions for formatting (can be reused from CallHistoryTable or made local)
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB");
    } catch (e) {
        return 'Invalid Date';
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    } catch (e) {
        return 'Invalid Time';
    }
  };

  const formatDuration = (totalSeconds) => {
    if (typeof totalSeconds !== 'number' || totalSeconds < 0) return 'N/A';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Helper to format transcript lines (different from original as transcript has role/message)
  const formatTranscriptLine = (line) => {
    if (!line || !line.role || !line.message) return '';
    // You might want to assign speaker names based on role (e.g., "AI", "User")
    const speaker = line.role === 'assistant' ? 'AI' : 'User';
    return `${speaker}: ${line.message}`;
  };

  // Check if call data is loaded/available
  if (!call) {
    return (
      <div className="ml-8 min-h-screen bg-white p-5">
        <p className="text-gray-500">Call data not found. Please navigate from Call History.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-[#3fbf81] text-white rounded-full hover:bg-[#36a973] transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="ml-8 min-h-screen bg-white p-5">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        Calls / <span className="text-gray-700 font-medium">Call Details</span>
      </p>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Call with {displayData.recipientName}
      </h1>
      <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
        <CalendarDaysIcon className="w-4 h-4" /> {formatDate(displayData.scheduledAt)}
        <span className="mx-1">•</span>
        <ClockIcon className="w-4 h-4" /> {formatTime(displayData.scheduledAt)}
        <span className="mx-1">•</span>
        Duration: {formatDuration(displayData.durationInSeconds)}
      </p>

      {/* AI Summary Section */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-[#3fbf81]" />
          AI-Powered Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{displayData.summary}</p>
      </section>

      {/* Actionable Insights (Topics & Actions) */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <ClipboardDocumentListIcon className="w-5 h-5 text-[#3fbf81]" />
          Actionable Insights
        </h2>

        {/* Topics */}
        <div className="mb-4">
          <h3 className="text-gray-700 font-medium mb-1">Key Topics Discussed</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {displayData.topics.length > 0 ? (
              displayData.topics.map((topic, i) => <li key={i}>{topic}</li>)
            ) : (
              <li>No key topics found.</li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div>
          <h3 className="text-gray-700 font-medium mb-1">Action Items Mentioned</h3>
          <ul className="space-y-1">
            {displayData.actions.length > 0 ? (
              displayData.actions.map((action, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-[#3fbf81]" /> {action}
                </li>
              ))
            ) : (
              <li>No action items mentioned.</li>
            )}
          </ul>
        </div>
      </section>

      {/* Call Recordings Section */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <PlayCircleIcon className="w-5 h-5 text-[#3fbf81]" />
          Call Recordings
        </h2>

        <div className="space-y-3">
          {displayData.audioRecordingUrl ? ( // Check for a single audioRecordingUrl
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 rounded-lg"
            >
              <div className="mb-2 sm:mb-0">
                <h4 className="text-gray-800 font-medium">Full Call Recording</h4>
                <p className="text-gray-500 text-sm">
                  {formatDate(displayData.scheduledAt)} • {formatTime(displayData.scheduledAt)} • {formatDuration(displayData.durationInSeconds)} min
                </p>
              </div>
              <a 
                href={displayData.audioRecordingUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#3fbf81] text-white rounded-full hover:bg-[#36a973] transition"
              >
                <PlayCircleIcon className="w-6 h-6" />
                Play
              </a>
            </div>
          ) : displayData.recordings.length > 0 ? ( // Fallback to multiple recordings if array is present
             displayData.recordings.map((rec, i) => ( // Using 'rec' from dummy data structure
                <div
                    key={rec.id || i} // Use id if available, fallback to index
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 rounded-lg"
                >
                    <div className="mb-2 sm:mb-0">
                        <h4 className="text-gray-800 font-medium">{rec.title || 'Recording'}</h4>
                        <p className="text-gray-500 text-sm">
                            {rec.date || 'N/A'} • {rec.time || 'N/A'} • {rec.duration || 'N/A'} min
                        </p>
                    </div>
                    <a
                        href={rec.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-[#3fbf81] text-white rounded-full hover:bg-[#36a973] transition"
                    >
                        <PlayCircleIcon className="w-6 h-6" />
                        Play
                    </a>
                </div>
            ))
          ) : (
            <p className="text-gray-700">No recordings available for this call.</p>
          )}
        </div>
      </section>

      {/* Transcript Section */}
      <section className="mb-10">
        <h3 className="text-gray-700 font-medium mb-2">Call Transcript</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-700 text-sm leading-relaxed max-h-[300px] overflow-y-auto">
          {displayData.transcript.length > 0 ? (
            displayData.transcript.map((line, i) => (
              <p key={i} className="mb-2">
                <span className="font-medium text-gray-900">
                  {/* Assuming transcript lines have 'role' and 'message' (from backend response) */}
                  {line.role === 'assistant' ? 'AI' : 'User'}:
                </span>{" "}
                {line.message}
              </p>
            ))
          ) : (
            <p>No transcript available for this call.</p>
          )}
        </div>
      </section>

      {/* Back Button */}
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