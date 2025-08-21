import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch } from "react-redux";
// import { adminLogout } from '../../../redux/adminSlice';
// import { removeAdminToken } from '../../../utils/adminAuth';
import { resetState } from '../../../redux/userSlice';

const AdminDashboard = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Function to handle link clicks
  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar after clicking a link
  };

   const handleLogout = () => {
    // Token clear
    localStorage.removeItem("token");

    // Redux state reset
      dispatch(resetState());

    // Redirect to login
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Mobile Toggle Button, visible on screens smaller than 1024px */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 
                   lg:relative lg:translate-x-0 lg:flex-shrink-0 
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="py-3 border-b border-gray-200">
          <h1 className="text-2xl font-bold px-3">Admin Panel</h1>
        </div>
        <ul className="p-3">
          <li className="w-full mt-4 px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('/admin-dashboard')}>
            <HomeOutlinedIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
            <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Dashboard</span>
          </li>
          <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('users')}>
            <PeopleAltOutlinedIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
            <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Users</span>
          </li>
          <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('members')}>
            <Groups2OutlinedIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
            <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Family Members</span>
          </li>
          <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('callhistory')}>
            <CallIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
            <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Completed Calls</span>
          </li>
          <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full"  onClick={handleLogout}>
            <LogoutIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
            <span className="text-lg font-normal text-gray-700 group-hover:text-green-600" >Logout</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

