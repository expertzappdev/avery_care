import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserIcon,
  CalendarDaysIcon,
  ClockIcon,
  PhoneArrowUpRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import { fetchFamilyMembersRequest } from "../../../redux/familySlice";
import {
  scheduleHealthCallRequest,
  fetchScheduledCallsRequest,
  updateScheduledCallRequest,
  deleteScheduledCallRequest,
  clearCallMessages,
} from "../../../redux/callSlice";

export default function ScheduleHealthCall() {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");

  const dispatch = useDispatch();
  const { familyMembers } = useSelector((state) => state.family);
  const { user } = useSelector((state) => state.auth);

  const { loading, error, scheduledCalls, message } = useSelector(
    (state) => state.call
  );

  // Filter for ONLY pending calls to display on this specific page
  const allFetchedCalls = Object.values(scheduledCalls || {});
  const pendingCallsArray = allFetchedCalls.filter(
    (call) => call.status === "pending"
  );

  const allMembers = [
    ...(user?.name ? [{ _id: user._id, name: user.name }] : []),
    ...(familyMembers || []),
  ];

  // --- Logic to prevent past date/time selection ---
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];
  const nowTime = now.toTimeString().slice(0, 5);

  const minTimeForToday = selectedDate === todayDate ? nowTime : "00:00";
  // --- End of logic ---

  useEffect(() => {
    dispatch(fetchFamilyMembersRequest());
  }, [dispatch]);

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

  const handleSchedule = () => {
    if (!selectedMember || !selectedDate || !selectedTime) {
      toast.error("⚠️ Please fill all fields before scheduling.");
      return;
    }

    // --- Final validation to block past times ---
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (selectedDateTime < now) {
      toast.error("⚠️ You cannot schedule a call in the past.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ Please log in before scheduling a call.");
      return;
    }

    const selectedMemberObject = allMembers.find(
      (member) => member.name === selectedMember
    );

    if (selectedMemberObject) {
      const scheduledToId =
        selectedMemberObject._id === user._id ? user._id : selectedMemberObject._id;

      const scheduledAtDateTime = selectedDateTime.toISOString();

      dispatch(
        scheduleHealthCallRequest({
          scheduledTo: scheduledToId,
          scheduledAt: scheduledAtDateTime,
        })
      );
    } else {
      toast.error("⚠️ Please select a valid family member from the list.");
    }

    setSelectedMember("");
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleEdit = (callId, currentScheduledAt) => {
    setEditingId(editingId === callId ? null : callId);
    if (editingId !== callId) {
      const date = new Date(currentScheduledAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      setEditedDate(`${year}-${month}-${day}`);
      setEditedTime(`${hours}:${minutes}`);
    }
  };

  const handleUpdate = (callId) => {
    if (!editedDate || !editedTime) {
      toast.error("⚠️ Please select new date and time for update.");
      return;
    }

    const newScheduledAt = `${editedDate}T${editedTime}:00`;
    dispatch(
      updateScheduledCallRequest({ id: callId, scheduledAt: newScheduledAt })
    );
    setEditingId(null);
  };

  const handleDelete = (callId) => {
    if (window.confirm("Are you sure you want to delete this scheduled call?")) {
      dispatch(deleteScheduledCallRequest(callId));
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-col sm:px-8 lg:px-12 pb-12 min-h-screen space-y-12">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Schedule Health Call
        </h1>
        <p className="text-gray-600">
          Schedule an{" "}
          <span className="text-[#3fbf81] font-semibold">AI-powered</span>{" "}
          health check call for a family member.
        </p>
      </div>

      {/* Form Section for Scheduling New Calls */}
      <div className="max-w-2xl space-y-8">
        {/* Member Dropdown */}
        <div>
          <label className="font-medium mb-2 text-gray-700 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-[#3fbf81]" />
            Select Family Member
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] transition"
          >
            <option value="">Choose a family member</option>
            {allMembers.map((member) => (
              <option key={member._id} value={member.name}>
                {member._id === user._id ? `${member.name} (You)` : member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="font-medium mb-2 text-gray-700 flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5 text-[#3fbf81]" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] transition"
            min={todayDate} // <-- Added min attribute for today's date
          />
        </div>

        {/* Time Picker */}
        <div>
          <label className="font-medium mb-2 text-gray-700 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-[#3fbf81]" />
            Select Time
          </label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] transition"
            min={minTimeForToday} // <-- Added conditional min attribute for time
          />
        </div>

        {/* Schedule Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSchedule}
            className="flex items-center gap-2 sm:px-8 sm:py-3 max-sm:px-4 max-sm:py-2 bg-[#3fbf81] text-white font-semibold rounded-full hover:bg-[#36a973] transition transform hover:scale-105"
            disabled={loading}
          >
            <PhoneArrowUpRightIcon className="w-5 h-5" />
            {loading ? "Scheduling..." : "Schedule Call"}
          </button>
        </div>
      </div>

      {/* Section for Upcoming Pending Calls */}
      <div className="max-w-2xl mt-0">
        <h2 className="text-xl font-semibold mb-4">Upcoming Pending Calls</h2>{" "}
        <div className="space-y-4">
          {pendingCallsArray.length === 0 && !loading ? (
            <p className="text-gray-500">No upcoming pending calls.</p>
          ) : (
            pendingCallsArray.map((call) => (
              <div
                key={call._id}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs"
              >
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5 text-[#3fbf81]" />
                      <p className="text-gray-800 font-semibold text-base">
                        {call.recipientName}{" "}
                        {call.scheduledTo === user._id.toString() && "(You)"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneArrowUpRightIcon className="w-5 h-5 text-[#3fbf81]" />
                      <p className="text-gray-700 text-sm">
                        {call.recipientNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-5 h-5 text-[#3fbf81]" />
                      <p className="text-gray-700 text-sm">
                        Date: {formatDate(call.scheduledAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-[#3fbf81]" />
                      <p className="text-gray-700 text-sm">
                        Time: {formatTime(call.scheduledAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          call.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : call.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        Status: {call.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    {call.status === "pending" && (
                      <button
                        onClick={() => handleEdit(call._id, call.scheduledAt)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        title="Edit"
                        disabled={loading}
                      >
                        <PencilSquareIcon className="w-5 h-5 text-[#3fbf81]" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(call._id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="Delete"
                      disabled={loading}
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                {editingId === call._id && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        New Date
                      </label>
                      <input
                        type="date"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        New Time
                      </label>
                      <input
                        type="time"
                        value={editedTime}
                        onChange={(e) => setEditedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleUpdate(call._id)}
                        className="text-sm bg-[#3fbf81] text-white px-4 py-2 rounded-md"
                        disabled={loading}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
