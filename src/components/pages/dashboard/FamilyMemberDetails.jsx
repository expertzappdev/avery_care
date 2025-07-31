import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import CallHistoryTable from "./CallHistoryTable"; // ✅ Reusable component

export default function FamilyMemberDetails() {
  const { state: member } = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  // ✅ Editable fields
  const [editData, setEditData] = useState({
    name: member?.name || "",
    relationship: member?.relationship || "",
    email: member?.email || "sarah.johnson@email.com",
    phone: member?.phone || "(555) 123-4567",
  });

  // ✅ FIXED profile image
  const profileImage =
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=faces&fit=crop&w=300&h=300";

  // ✅ Input handler
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ✅ Save button action
  const handleSave = () => {
    alert("✅ Details updated successfully!");
    setIsEditing(false);
  };

  // ✅ Sample Call History (member-specific)
  const memberCalls = [
    { date: "July 15, 2024", time: "10:00 AM", topics: "Follow-up Check, Sleep Issues" },
    { date: "July 1, 2024", time: "9:30 AM", topics: "Diet Plan, Hydration" },
    { date: "June 20, 2024", time: "6:00 PM", topics: "Routine Health Check" },
  ];

  return (
    <div className="ml-8 md:ml-0 min-h-screen bg-white">
      
      {/* ✅ Breadcrumb */}
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Family Members /{" "}
        <span className="text-gray-700 font-medium">{member?.name}</span>
      </p>

      {/* ✅ Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl">
        <div className="flex items-center gap-4">
          {/* ✅ Profile Image */}
          <img
            src={profileImage}
            alt={member?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{editData.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {editData.relationship}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {editData.email} · {editData.phone}
            </p>
          </div>
        </div>

        {/* ✅ Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition w-full sm:w-auto"
        >
          <PencilSquareIcon className="w-5 h-5" />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* ✅ Edit Form */}
      {isEditing && (
        <div className="mt-4 p-5 rounded-xl">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Edit Member Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Relationship", name: "relationship", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={editData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3fbf81] outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#3fbf81] text-white font-medium rounded-full hover:bg-[#36a973] transition w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ✅ Health Details */}
      <div className="mt-6 p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Health Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Conditions", value: "None" },
            { label: "Medications", value: "None" },
            { label: "Allergies", value: "None" },
            { label: "Preferences", value: "Prefers calls in the evening" },
          ].map((item, idx) => (
            <div key={idx}>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-gray-800 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Call History */}
      <div className="mt-6 p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Call History
        </h2>
        <CallHistoryTable calls={memberCalls} />
      </div>

      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-[#3fbf81] text-white rounded-full hover:bg-[#36a973] transition w-full sm:w-auto"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Family Members
      </button>
    </div>
  );
}
