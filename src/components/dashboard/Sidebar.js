import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../contant";

const Sidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    console.log("Navigating to:", section);
    setActiveSection(section);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate(routes.signin);
  };

  return (
    <div className="w-72 bg-gradient-to-b from-[#1a2a6c] to-[#0f1d4a] text-white h-screen fixed shadow-lg flex flex-col transition-all duration-300">
      <div className="px-6 py-4 border-b border-[#2b3a7d]">
        <h3 className="text-2xl font-bold tracking-tight">Logo</h3>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li
            className={`flex items-center space-x-3 px-6 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSection === "Overview"
                ? "bg-[#b21f1f] text-white shadow-md"
                : "hover:bg-[#2b3a7d] hover:text-[#fdbb2d]"
            }`}
            onClick={() => handleNavigation("Overview")}
          >
            <i className="fas fa-tachometer-alt text-lg"></i>
            <span className="text-sm font-medium">Dashboard</span>
          </li>
          <li
            className={`flex items-center space-x-3 px-6 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSection === "Users"
                ? "bg-[#b21f1f] text-white shadow-md"
                : "hover:bg-[#2b3a7d] hover:text-[#fdbb2d]"
            }`}
            onClick={() => handleNavigation("Users")}
          >
            <i className="fas fa-users text-lg"></i>
            <span className="text-sm font-medium">Users</span>
          </li>
          <li
            className={`flex items-center space-x-3 px-6 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSection === "Activities"
                ? "bg-[#b21f1f] text-white shadow-md"
                : "hover:bg-[#2b3a7d] hover:text-[#fdbb2d]"
            }`}
            onClick={() => handleNavigation("Activities")}
          >
            <i className="fas fa-tasks text-lg"></i>
            <span className="text-sm font-medium">Activities</span>
          </li>
        </ul>
      </nav>
      <div className="px-6 py-4 border-t border-[#2b3a7d]">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center py-2 bg-transparent text-[#fdbb2d] hover:bg-[#b21f1f] hover:text-white rounded-lg transition-all duration-200 border border-[#fdbb2d]"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;