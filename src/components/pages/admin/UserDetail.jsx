import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetailRequest } from "../../../redux/userSlice";
import { getAdminToken } from "../../../utils/adminAuth";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDetail, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate("/admin-login");
      return;
    }
    dispatch(fetchUserDetailRequest(id));
  }, [dispatch, id, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-lg p-8">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-lg p-8 text-red-500">{error}</p>
      </div>
    );

  if (!userDetail) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p className="text-xl">User not found</p>
        <button
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-colors"
          onClick={() => navigate("/admin-dashboard/users")}
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
      <div className="flex-1 min-h-screen bg-white font-sans px-4 sm:px-6 pt-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center text-lg text-[#3FBF81] font-semibold mb-2 sm:mb-0">
          <span className="mr-2 text-2xl">Users </span>
          <span className="font-semibold text-gray-700 text-2xl ml-1 truncate">
            / {userDetail.name}
          </span>
        </div>
        {/* Back button for tablet and larger screens */}
        <button
          className="hidden sm:flex px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-full text-sm hover:bg-gray-200 transition-colors"
          onClick={() => navigate("/admin-dashboard/users")}
        >
          <ArrowLeftIcon className="h-4 w-4 inline-block mr-2" />
          Back to Users
        </button>
      </div>

      {/* User Profile Section */}
      <div className="bg-white rounded-xl p-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-indigo-100 flex items-center justify-center text-3xl font-bold text-[#3FBF81]">
              {userDetail.name ? userDetail.name[0].toUpperCase() : "?"}
            </div>
            {/* Info */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {userDetail.name}
              </h2>
              <p className="text-sm text-gray-500 break-all">{userDetail.email}</p>
            </div>
          </div>
        </div>

        {/* Family Members Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-7">
            Family Members
          </h3>
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-gray-200">
            {userDetail.familyMembers?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr className="hover:bg-gray-100 transition">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Relationship
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userDetail.familyMembers.map((fm) => (
                    <tr key={fm._id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {fm.member?.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {fm.member?.email || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {fm.relationship}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {fm.member?.phoneNumber || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 italic p-2">No family members listed.</p>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden grid grid-cols-1 gap-4">
            {userDetail.familyMembers?.length > 0 ? (
              userDetail.familyMembers.map((fm) => (
                <div
                  key={fm._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">Name:</span>
                    <span className="text-sm text-gray-600">{fm.member?.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">Email:</span>
                    <span className="text-sm text-gray-600 truncate">{fm.member?.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">Relationship:</span>
                    <span className="text-sm text-gray-600">{fm.relationship}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Phone:</span>
                    <span className="text-sm text-gray-600">{fm.member?.phoneNumber || "N/A"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic p-2">No family members listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
