import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from 'react-toastify'; // ❌ Removed toast import

import {
  fetchFamilyMembersRequest,
  addFamilyMemberRequest,
  deleteFamilyMemberRequest,
  // clearMessages, // ❌ Removed clearMessages import - THIS IS THE KEY LINE
} from "../../../redux/familySlice";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function FamilyMembers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { familyMembers: familyList, loading, error } = useSelector(
    (state) => state.family
  );

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(fetchFamilyMembersRequest());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (
      !formData.name ||
      !formData.relationship ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      alert("Please fill in ALL required fields (Name, Relationship, Email, Phone Number).");
      return;
    }

    dispatch(addFamilyMemberRequest(formData));
    setFormData({ name: "", relationship: "", email: "", phoneNumber: "" });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this family member?"
    );
    if (confirmDelete) {
      dispatch(deleteFamilyMemberRequest(id));
    }
  };

  const handleDetails = (member) => {
    navigate(`/family/${member._id || member.id}`, { state: member });
  };

  return (
    <div className="flex flex-col md:flex-row px-5 sm:px-8 lg:px-12 gap-10 min-h-screen bg-white">
      <div className="flex-1 rounded-xl space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Family Member
        </h1>

        <div className="space-y-5">
          {[
            { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
            {
              label: "Relationship",
              name: "relationship",
              type: "text",
              placeholder: "Enter relationship",
            },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block font-medium mb-2 text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full rounded-md px-4 py-2 bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] transition"
              />
            </div>
          ))}

          <div>
  <label className="block font-medium mb-2 text-gray-700">Phone Number</label>
  <PhoneInput
    country={"in"}
    onlyCountries={["in"]}
    countryCodeEditable={false}
    disableDropdown={true} // 🔒 Lock flag dropdown
    value={`91${formData.phoneNumber}`} // internally uses full
    onChange={(value) => {
      // Remove +91 if present
      const cleaned = value.replace(/^91/, "");
      if (/^\d{0,10}$/.test(cleaned)) {
        setFormData({ ...formData, phoneNumber: cleaned });
      }
    }}
    inputStyle={{
      width: "93.5%",
      marginLeft:'30px',
      borderRadius: "0.375rem",
      padding: "0.5rem 1rem",
      height:' 42px',
      border: "1px solid #d1d5db",
    }}
    containerStyle={{
      width: "100%",
    }}
  />
</div>



          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddMember}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2 bg-[#3fbf81] text-white font-medium rounded-full hover:bg-[#36a973] transition text-sm sm:text-base ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <UserPlusIcon className="w-5 h-5" />
                  Add Family Member
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-4 md:mt-4 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Added Family Members
        </h2>

        {loading && familyList.length === 0 && (
          <p className="text-gray-500 italic mt-4">
            Loading family members...
          </p>
        )}

        {!loading && familyList.length === 0 ? (
          <p className="text-gray-500 italic mt-4">
            No family members added yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-200">
            {Array.isArray(familyList) && familyList.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition"
              >
                <div>
                  <p className="font-medium text-lg text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(member._id)}
                    disabled={loading}
                    className={`text-red-500 hover:text-red-700 transition ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDetails(member)}
                    disabled={loading}
                    className={`px-4 py-1 text-sm font-medium text-[#3fbf81] border border-[#3fbf81] rounded-full hover:bg-[#3fbf81] hover:text-white transition ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
