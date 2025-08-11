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
import { scheduleHealthCallRequest } from "../../../redux/callSlice";

export default function ScheduleHealthCall() {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [calls, setCalls] = useState([
    {
      id: 1,
      member: "Ethan Carter",
      phone: "+91 9876543210",
      date: "2025-08-10",
      time: "10:00",
    },
    {
      id: 2,
      member: "Sophia Carter",
      phone: "+91 9123456780",
      date: "2025-08-12",
      time: "15:30",
    },
  ]);

  const dispatch = useDispatch();
  const { familyMembers } = useSelector((state) => state.family);
  const { user } = useSelector((state) => state.auth);

  const { loading, error, scheduledCalls } = useSelector((state) => state.call);

  const allMembers = [
    ...(user?.name ? [{ _id: "self", name: user.name }] : []),
    ...(familyMembers || []),
  ];

  useEffect(() => {
    dispatch(fetchFamilyMembersRequest());
  }, [dispatch]);

  // Listen for backend success/error and show toast
  useEffect(() => {
    if (loading) {
      toast.info("⏳ Scheduling health call...", { autoClose: 2000 });
    }
    if (error) {
      toast.error(`❌ Error: ${error}`);
    }
    if (scheduledCalls.length > 0) {
      const lastScheduled = scheduledCalls[scheduledCalls.length - 1];
      toast.success(lastScheduled?.message || "✅ Health call scheduled successfully!");
    }
  }, [loading, error, scheduledCalls]);

  const handleSchedule = () => {
    if (!selectedMember || !selectedDate || !selectedTime) {
      toast.error("⚠️ Please fill all fields before scheduling.");
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
        selectedMemberObject._id === "self" ? user._id : selectedMemberObject._id;

      const scheduledAtDateTime = `${selectedDate}T${selectedTime}:00`;

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

  const handleEdit = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  const handleUpdate = (id, newDate, newTime) => {
    setCalls((prev) =>
      prev.map((call) =>
        call.id === id ? { ...call, date: newDate, time: newTime } : call
      )
    );
    setEditingId(null);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="flex flex-col px-5 sm:px-8 lg:px-12 pb-12 min-h-screen space-y-12">
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

      {/* Form Section */}
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
                {member._id === "self" ? `${member.name} (You)` : member.name}
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
          />
        </div>

        {/* Schedule Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSchedule}
            className="flex items-center gap-2 px-8 py-3 bg-[#3fbf81] text-white font-semibold rounded-full hover:bg-[#36a973] transition transform hover:scale-105"
          >
            <PhoneArrowUpRightIcon className="w-5 h-5" />
            Schedule Health Call
          </button>
        </div>
      </div>

      {/* All Scheduled Calls */}
      <div className="max-w-2xl mt-0">
        <h2 className="text-xl font-semibold mb-4">All Scheduled Calls</h2>
        <div className="space-y-4">
          {calls.map((call) => (
            <div
              key={call.id}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs"
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-[#3fbf81]" />
                    <p className="text-gray-800 font-semibold text-base">
                      {call.member}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneArrowUpRightIcon className="w-5 h-5 text-[#3fbf81]" />
                    <p className="text-gray-700 text-sm">{call.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-5 h-5 text-[#3fbf81]" />
                    <p className="text-gray-700 text-sm">
                      Date: {formatDate(call.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-[#3fbf81]" />
                    <p className="text-gray-700 text-sm">Time: {call.time}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => handleEdit(call.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    title="Edit"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-[#3fbf81]" />
                  </button>
                  <button
                    onClick={() => alert(`Delete ${call.member}`)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              {editingId === call.id && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue={call.date}
                      onChange={(e) => (call.date = e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      defaultValue={call.time}
                      onChange={(e) => (call.time = e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() =>
                        handleUpdate(call.id, call.date, call.time)
                      }
                      className="text-sm bg-[#3fbf81] text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
