import Sidebar from "../Sidebar";
import Dashboard from "./dashboard/Dashboard";
import React from "react";
import FamilyMembers from "./dashboard/FamilyMembers";

export default function DashboardLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      {/* <Dashboard /> */}
      <FamilyMembers/>
    </div>
  );
}
