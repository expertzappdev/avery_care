import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsersRequest,fetchFamilyMembersRequest } from '../../../redux/userSlice';
import { useDispatch, useSelector } from "react-redux";

const Overview = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch()


   const { list: users, familyMembers, loading, error } = useSelector(
     (state) => state.users
   );

   const { totalFamilyMembers } = useSelector((state) => state.users);
   const { totalUsers } = useSelector((state) => state.users);
    useEffect(() => {
     dispatch(fetchUsersRequest());
      dispatch(fetchFamilyMembersRequest());
   }, [dispatch]);
 
     const cards = [
     { label: "Total Users", value: totalUsers, route: "/admin/users" },
   ];
  const statuses = ['User Service', 'Call Service', 'AI Engine', 'Database'];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-7 font-sans">
      
      {/* Overview Header */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
        Overview
      </h2>

      {/* Overview Cards - Using flexbox for more fluid responsiveness */}
      <div className="grid grid-cols-1 min-[350px]:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Users Card */}
        <div
          className="col-span-1 lg:max-w-[210px] min-h-[120px]"
          onClick={() => navigate('users')}
        >
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
            <div className="text-xl text-gray-600 font-medium">Total Users</div>
            <div className="text-3xl font-bold text-gray-800 mt-3">
            {loading ? "..." : totalUsers ?? 0}
            </div>
          </div>
        </div>

        {/* Total Family Members Card */}
        <div 
          className="col-span-1 lg:max-w-[210px] min-h-[120px]"
          onClick={() => navigate('members')}
        >
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
            <div className="text-xl text-gray-600 font-medium">Total Family Members</div>
            <div className="text-3xl font-bold text-gray-800 mt-3">
            {loading ? "..." : totalFamilyMembers ?? 0}
            </div>
          </div>
        </div>

        {/* Completed Calls Card */}
        <div className="col-span-1 lg:max-w-[210px] min-h-[120px]">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
            <div className="text-xl text-gray-600 font-medium text-center">Completed Calls</div>
            <div className="text-3xl font-bold text-gray-800 mt-3">--</div>
          </div>
        </div>

        {/* Active Today Card */}
        <div className="col-span-1 lg:max-w-[210px] min-h-[120px]">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
            <div className="text-xl text-gray-600 font-medium">Active Today </div>
            <div className="text-3xl font-bold text-gray-800 mt-3">--</div>
          </div>
        </div>
      </div>
  
      {/* System Status Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 lg:mr-12">
        <h2 className="text-xl font-semibold mb-6">System Status</h2>
        <ul className="space-y-6">
          {statuses.map((status, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-gray-800"
            >
              <span>{status}</span>
              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

 export default Overview;

