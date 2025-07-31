import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  ClockIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { id: "dashboard", name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { id: "schedule", name: "Schedule", icon: CalendarIcon, path: "/schedule" },
  { id: "history", name: "Call History", icon: ClockIcon, path: "/history" },
  { id: "family", name: "Family Members", icon: UserGroupIcon, path: "/family-members" },
  { id: "settings", name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen bg-white border-r border-gray-200 flex flex-col w-20 md:w-72 transition-all duration-300 pt-8">
      {/* ✅ Sidebar Navbar ke neeche start hota hai */}

      {/* ✅ Navigation */}
      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-full mx-2 md:mx-4 transition-all duration-200
               ${
                 isActive
                   ? "bg-[#E3F5ED] text-[#3fbf81] font-semibold"
                   : "text-gray-700 hover:bg-[#F6FAF9]"
               }`
            }
          >
            {/* ✅ Icon */}
            <item.icon className="h-5 w-5 mx-auto md:mx-0" />
            {/* ✅ Text (sirf desktop pe show hoga) */}
            <span className="hidden md:inline">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
