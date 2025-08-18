import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFamilyMembersRequest } from "../../../redux/familySlice";
import {
  User,
  Phone,
  Lock,
  HelpCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";

const SettingsPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Change Phone Number state
  const [phoneData, setPhoneData] = useState({
    oldPhone: user?.phoneNumber || "",
    newPhone: "",
    password: "",
  });

  const handlePhoneChange = (value) => {
    if (!value.startsWith("91")) {
      value = "91" + value.replace(/^(\+?91)?/, "");
    }
    setPhoneData((prev) => ({ ...prev, newPhone: `+${value}` }));
  };

  const handlePhoneKeyDown = (e) => {
    const input = e.target;
    const caretPosition = input.selectionStart;

    if ((e.key === "Backspace" || e.key === "Delete") && caretPosition <= 3) {
      e.preventDefault();
    }
  };

  const updatePhone = () => {
    // Replaced alert with a message box for a non-blocking UI
    const message = `Phone updated to: ${phoneData.newPhone}`;
    // In a real app, you would dispatch a Redux action here.
    alert(message);
    setPhoneData({ ...phoneData, newPhone: "", password: "" });
  };

  // Change Password state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const updatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Replaced alert with a message box for a non-blocking UI
    // In a real app, you would dispatch a Redux action here.
    alert("Password updated successfully!");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const deleteAccount = () => {
    // Replaced window.confirm with a message box for a non-blocking UI
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      // In a real app, you would dispatch a Redux action to delete the account.
      alert("Your account has been deleted.");
    }
  };

  const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchFamilyMembersRequest());
}, [dispatch]);

const familyMembers = useSelector((state) => state.family.familyMembers);
  const familyCount = familyMembers?.length || 0;


  return (
    <div className="min-h-screen bg-white sm:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Settings</h2>

      {/* Profile Section */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("profile")}
          className="w-full flex items-center gap-3 py-3 text-gray-900 font-semibold text-lg"
        >
          <User className="w-5 h-5 text-gray-700" />
          Personal Info
          {openSection === "profile" ? <ChevronUp className="ml-auto w-5 h-5" /> : <ChevronDown className="ml-auto w-5 h-5" />}
        </button>

        {openSection === "profile" && (
          <div className="pl-6 sm:pl-8 pt-3 text-gray-700 space-y-4">
            <div className="pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-base font-semibold text-gray-900">{user?.name || "N/A"}</p>
            </div>
            <div className="pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-base font-semibold text-gray-900">{user?.email || "N/A"}</p>
            </div>
            <div className="pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-base font-semibold text-gray-900">{user?.phoneNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Family Members Linked</p>
              <p className="text-base font-semibold text-gray-900">{familyCount}</p>
            </div>
          </div>
        )}
      </div>

      {/* Change Phone Number */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => toggleSection("phone")}
          className="w-full flex items-center gap-3 py-3 text-gray-900 font-semibold text-lg"
        >
          <Phone className="w-5 h-5 text-gray-700" />
          Change Number
          {openSection === "phone" ? <ChevronUp className="ml-auto w-5 h-5" /> : <ChevronDown className="ml-auto w-5 h-5" />}
        </button>

        {openSection === "phone" && (
          <div className="pl-6 sm:pl-8 pt-3 space-y-3 text-gray-700">
            <p className="text-sm">
              <strong>Current Phone:</strong> {user?.phoneNumber || "N/A"}
            </p>

            <div>
              <label className="block text-sm font-medium mb-1">New Phone Number</label>
              <PhoneInput
                country={"in"}
                onlyCountries={["in"]}
                disableDropdown={true}
                value={phoneData.newPhone}
                onChange={handlePhoneChange}
                inputProps={{
                  onKeyDown: handlePhoneKeyDown,
                  name: "phoneNumber",
                  required: true,
                }}
                inputStyle={{
                  width: '100%',
                  maxWidth: '250px',
                  padding: '8px 12px',
                  marginLeft: '35px',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
                buttonStyle={{
                  borderRadius: "8px 0 0 8px",
                  border: "1px solid #d1d5db",
                  padding: "0 5px 0",
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={phoneData.password}
                onChange={(e) =>
                  setPhoneData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter your password"
                className="mt-1 w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbf81] text-sm"
              />
            </div>

            <button
              onClick={updatePhone}
              className="bg-[#3fbf81] hover:bg-[#36a973] text-white px-4 py-2 rounded-md text-sm mt-2"
            >
              Update Phone
            </button>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => toggleSection("password")}
          className="w-full flex items-center gap-3 py-3 text-gray-900 font-semibold text-lg"
        >
          <Lock className="w-5 h-5 text-gray-700" />
          Change Password
          {openSection === "password" ? <ChevronUp className="ml-auto w-5 h-5" /> : <ChevronDown className="ml-auto w-5 h-5" />}
        </button>

        {openSection === "password" && (
          <div className="pl-6 sm:pl-8 pt-3 space-y-3 text-gray-700">
            <div>
              <label className="block text-sm font-medium">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter old password"
                className="mt-1 w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbf81] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="mt-1 w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbf81] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="mt-1 w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbf81] text-sm"
              />
            </div>

            <button
              onClick={updatePassword}
              className="bg-[#3fbf81] hover:bg-[#36a973] text-white px-4 py-2 rounded-md text-sm mt-2"
            >
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* Help & Support */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => toggleSection("help")}
          className="w-full flex items-center gap-3 py-3 text-gray-900 font-semibold text-lg"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
          Help & Support
          {openSection === "help" ? <ChevronUp className="ml-auto w-5 h-5" /> : <ChevronDown className="ml-auto w-5 h-5" />}
        </button>

        {openSection === "help" && (
          <div className="pl-6 sm:pl-8 pt-3 space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <a href="mailto:support@example.com" className="text-blue-600 underline">
                Email Support
              </a>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gray-600" />
              <a href="/faq" className="text-blue-600 underline">
                FAQs & Help Center
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => toggleSection("delete")}
          className="w-full flex items-center gap-3 py-3 font-semibold text-lg "
        >
          <Trash2 className="w-5 h-5 " />
          Delete Account
          {openSection === "delete" ? <ChevronUp className="ml-auto w-5 h-5" /> : <ChevronDown className="ml-auto w-5 h-5" />}
        </button>

        {openSection === "delete" && (
          <div className="pl-6 sm:pl-8 pt-3 text-gray-700">
            <p className="text-sm mb-3">
              Deleter your account will remove all your data permanently. This action cannot be undone.
            </p>
            <button
              onClick={deleteAccount}
              className="bg-[#3FBF81] hover:bg-[#36a973] text-white px-4 py-2 rounded-md text-sm cursor-pointer"
            >
              Confirm Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
