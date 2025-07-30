import { LayoutDashboard, Calendar, History, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-green-50 h-screen p-6 shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-10 text-green-700">AveryHealth</h2>
      
      <nav className="flex flex-col gap-6">
        <Link to="/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-green-600">
          <LayoutDashboard size={20}/> Dashboard
        </Link>
        <Link to="/schedule" className="flex items-center gap-3 text-gray-700 hover:text-green-600">
          <Calendar size={20}/> Schedule
        </Link>
        <Link to="/history" className="flex items-center gap-3 text-gray-700 hover:text-green-600">
          <History size={20}/> History
        </Link>
        <Link to="/settings" className="flex items-center gap-3 text-gray-700 hover:text-green-600">
          <Settings size={20}/> Settings
        </Link>
      </nav>
    </div>
  );
}
