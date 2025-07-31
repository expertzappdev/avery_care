import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function FamilyMembers() {
    const navigate = useNavigate();  // ✅ HOOK

  const [familyList, setFamilyList] = useState([
    { name: "Ethan Carter", relationship: "Spouse" },
    { name: "Sophia Carter", relationship: "Child" },
    { name: "Liam Carter", relationship: "Sibling" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (formData.name && formData.relationship) {
      setFamilyList([
        ...familyList,
        { name: formData.name, relationship: formData.relationship },
      ]);
      setFormData({ name: "", relationship: "", email: "", phone: "" });
    }
  };
  const handleDetails = (member) => {
    navigate(`/family/${member.id}`, { state: member });
  };

  return (
    <div className="flex flex-col md:flex-row px-5 sm:px-8 lg:px-12 gap-10 min-h-screen bg-white">
      
      {/* ✅ LEFT: FORM SECTION */}
      <div className="flex-1 rounded-xl space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Family Member
        </h1>

        <div className="space-y-5">
          {[
            { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
            { label: "Relationship", name: "relationship", type: "text", placeholder: "Enter relationship" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
            { label: "Phone Number", name: "phone", type: "text", placeholder: "Enter phone number" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block font-medium mb-2 text-gray-700">{field.label}</label>
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

          {/* ✅ Add Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddMember}
              className="flex items-center gap-2 px-6 py-2 bg-[#3fbf81] text-white font-medium rounded-full hover:bg-[#36a973] transition text-sm sm:text-base"
            >
              <UserPlusIcon className="w-5 h-5" />
              Add Family Member
            </button>
          </div>
        </div>
      </div>

      {/* ✅ RIGHT: FAMILY MEMBERS LIST */}
      {/* ✅ RIGHT: FAMILY MEMBERS LIST */}
      <div className="flex-1 mt-4 md:mt-4 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Added Family Members
        </h2>

        {familyList.length === 0 ? (
          <p className="text-gray-500 italic">No family members added yet.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {familyList.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition"
              >
                <div>
                  <p className="font-medium text-lg text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                </div>

                {/* ✅ DETAILS BUTTON */}
                <button
                  onClick={() => handleDetails(member)}
                  className="px-4 py-1 text-sm font-medium text-[#3fbf81] border border-[#3fbf81] rounded-full hover:bg-[#3fbf81] hover:text-white transition"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
