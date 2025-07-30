import Sidebar from "../Sidebar";
import Dashboard from "./dashboard/Dashboard";
import React from "react";

export default function DashboardLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
