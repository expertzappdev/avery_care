import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import CallHistoryTable from "./CallHistoryTable"; // Path adjust kar lena
import { useDispatch, useSelector } from "react-redux";
import {
  updateFamilyMemberRequest,
  setSelectedFamilyMember,
  fetchFamilyMembersRequest,
} from "../../../redux/familySlice"; // Path adjust kar lena
import { fetchScheduledCallsRequest } from "../../../redux/callSlice.js"; // Call slice import karein
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function FamilyMemberDetails() {
  const { id } = useParams(); // Family Member ki ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedFamilyMember, familyMembers, loading, error } = useSelector(
    (state) => state.family
  );
  // Redux se saari calls, loading, error states lein
  const { scheduledCalls, loading: callsLoading, error: callsError } = useSelector(
    (state) => state.call
  );
  const loggedInUserId = useSelector((state) => state.auth.user._id); // Logged-in user ki ID

  const [isEditing, setIsEditing] = useState(false);

  const member =
    selectedFamilyMember ||
    familyMembers.find((m) => m._id === id || m.id === id); // ID string ya ObjectId ho sakti hai

  // Fetch family members if not already loaded
  useEffect(() => {
    if (!familyMembers.length) {
      dispatch(fetchFamilyMembersRequest());
    }
  }, [dispatch, familyMembers.length]);

  // Set selectedFamilyMember in Redux
  useEffect(() => {
    if (!selectedFamilyMember && member) {
      dispatch(setSelectedFamilyMember(member));
    }
  }, [dispatch, selectedFamilyMember, member]);

  // Fetch calls specific to this family member
  useEffect(() => {
    if (loggedInUserId) { // Ensure logged-in user ID is available
      // Fetch ALL calls relevant to the logged-in user from Redux store
      // This is the same action used on ScheduleHealthCall and CallHistory pages
      dispatch(fetchScheduledCallsRequest({ userId: loggedInUserId }));
    }
  }, [dispatch, loggedInUserId]); // Dependency on loggedInUserId

  const [editData, setEditData] = useState({
    name: member?.name || "",
    relationship: member?.relationship || "",
    email: member?.email || "sarah.johnson@email.com",
    phone: member?.phone?.replace(/^\+91/, "") || "",
  });

  // Update editData when member object changes
  useEffect(() => {
    if (member) {
      setEditData({
        name: member.name || "",
        relationship: member.relationship || "",
        email: member.email || "sarah.johnson@email.com",
        phone: member.phone?.replace(/^\+91/, "") || "",
      });
    }
  }, [member]);

  const profileImage =
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=faces&fit=crop&w=300&h=300";

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(
      updateFamilyMemberRequest({
        id: member._id,
        updatedData: {
          name: editData.name,
          email: editData.email,
          phoneNumber: editData.phone, // Ensure your backend expects 'phoneNumber' or 'phone'
          relationship: editData.relationship,
        },
      })
    );

    // Timeout remove kiya gaya hai, saga update ke baad auto-refresh karega list
    // dispatch(fetchFamilyMembersRequest()); // Saga should handle this implicitly

    setIsEditing(false);
  };

  // Update selectedFamilyMember in Redux when familyMembers list updates (after save)
  useEffect(() => {
    const updatedMember = familyMembers.find((m) => m._id === id || m.id === id);
    if (updatedMember) {
      dispatch(setSelectedFamilyMember(updatedMember));
    }
  }, [familyMembers, id, dispatch]);


  // --- Filtering Calls for this Specific Family Member ---
  const allFetchedCallsArray = Object.values(scheduledCalls || {}); // All calls the logged-in user can see

  const callsForThisMember = allFetchedCallsArray.filter(call => {
    // Check if the current family member is either the scheduler or the recipient of the call
    // Make sure to compare IDs as strings as one might be ObjectId and other string
    return (
      call.scheduledBy === id || // If this family member scheduled the call
      call.scheduledTo === id     // If this family member is the recipient of the call
    );
  });

  // Decide what status calls to show (e.g., only completed calls for history)
  const displayedCallsForMember = callsForThisMember.filter(call => call.status === 'completed');
  // --- END Filtering Calls ---


  if (!member) {
    return (
      <div className="p-5">
        <p className="text-gray-500">Loading member details...</p>
      </div>
    );
  }

  return (
    <div className="sm:ml-8 md:ml-0 min-h-screen bg-white">
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Family Members / <span className="text-gray-700 font-medium">{member?.name}</span>
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl">
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            alt={member?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{editData.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base">{editData.relationship}</p>
            <p className="text-gray-600 text-sm sm:text-base">{editData.email} · +91{editData.phone}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition w-full sm:w-auto"
            disabled={loading}
          >
            <PencilSquareIcon className="w-5 h-5" />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {isEditing && (
        <div className="mt-4 p-5 rounded-xl">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Edit Member Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ label: "Full Name", name: "name", type: "text" }, { label: "Relationship", name: "relationship", type: "text" }, { label: "Email", name: "email", type: "email" }].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={editData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3fbf81] outline-none"
                />
              </div>
            ))}

            {/* Custom Phone Input with 🇮🇳 flag & +91 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <PhoneInput
                country={"in"}
                onlyCountries={["in"]}
                countryCodeEditable={false}
                disableDropdown={true}
                value={`91${editData.phone}`}
                onChange={(value) => {
                  const clean = value.replace(/^91/, "");
                  if (/^\d{0,10}$/.test(clean)) {
                    setEditData({ ...editData, phone: clean });
                  }
                }}
                inputStyle={{
                  width: "94%",
                  marginLeft: "32px",
                  height: "41px",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                }}
                containerStyle={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#3fbf81] text-white font-medium rounded-full hover:bg-[#36a973] transition w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Health Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: "Conditions", value: "None" }, { label: "Medications", value: "None" }, { label: "Allergies", value: "None" }, { label: "Preferences", value: "Prefers calls in the evening" }].map((item, idx) => (
            <div key={idx}>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-gray-800 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Call History</h2>
        {/* Pass filtered calls to CallHistoryTable */}
        {callsLoading && displayedCallsForMember.length === 0 ? (
          <p className="text-gray-500">Loading call history for {member?.name}...</p>
        ) : callsError ? (
          <p className="text-red-500">Error loading calls: {callsError}</p>
        ) : (
          <CallHistoryTable calls={displayedCallsForMember} />
        )}
        {!callsLoading && !callsError && displayedCallsForMember.length === 0 && (
          <p className="text-gray-500 italic mt-4">
            No completed calls found for {member?.name}.
          </p>
        )}
      </div>

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