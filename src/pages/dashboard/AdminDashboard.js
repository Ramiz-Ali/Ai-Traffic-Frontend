import React, { useState, useEffect } from "react";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import User from "./User";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Overview");
  const [activities, setActivities] = useState([]); // Pending video uploads
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    pendingTasks: 0,
    systemStatus: "Loading...",
  });
  const [recentActivity, setRecentActivity] = useState([]);

  // Fetch dashboard stats and recent activity on mount and when Overview is active
  useEffect(() => {
    if (activeSection === "Overview") {
      const fetchStats = async () => {
        try {
          const statsResponse = await axios.get("http://localhost:5000/dashboard/stats");
          setDashboardStats(statsResponse.data);
        } catch (error) {
          console.error("Error fetching dashboard stats:", error);
          toast.error("Failed to load dashboard stats.", { position: "top-right" });
        }
      };

      const fetchRecentActivity = async () => {
        try {
          const activityResponse = await axios.get("http://localhost:5000/dashboard/recent-activity");
          setRecentActivity(activityResponse.data);
        } catch (error) {
          console.error("Error fetching recent activity:", error);
          toast.error("Failed to load recent activity.", { position: "top-right" });
        }
      };

      fetchStats();
      fetchRecentActivity();
    }
  }, [activeSection]);

  // Fetch pending activities when Activities section is active
  useEffect(() => {
    if (activeSection === "Activities") {
      const fetchActivities = async () => {
        try {
          const response = await axios.get("http://localhost:5000/activities");
          setActivities(response.data);
        } catch (error) {
          console.error("Error fetching activities:", error);
          toast.error("Failed to load pending activities.", { position: "top-right" });
        }
      };
      fetchActivities();
    }
  }, [activeSection]);

  // Handle approve/reject actions
  const handleApprove = async (activityId) => {
    try {
      await axios.post(`http://localhost:5000/activities/${activityId}/approve`);
      setActivities(activities.filter((activity) => activity.id !== activityId));
      toast.success("Activity approved successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error approving activity:", error);
      toast.error("Failed to approve activity.", { position: "top-right" });
    }
  };

  const handleReject = async (activityId) => {
    try {
      await axios.post(`http://localhost:5000/activities/${activityId}/reject`);
      setActivities(activities.filter((activity) => activity.id !== activityId));
      toast.success("Activity rejected successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error rejecting activity:", error);
      toast.error("Failed to reject activity.", { position: "top-right" });
    }
  };

  const renderSection = () => {
    console.log("Rendering Section:", activeSection);
    switch (activeSection) {
      case "Overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-[#1a2a6c]">{dashboardStats.totalUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">Active Sessions</h3>
                <p className="text-2xl font-bold text-[#1a2a6c]">{dashboardStats.activeSessions}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">Pending Tasks</h3>
                <p className="text-2xl font-bold text-[#b21f1f]">{dashboardStats.pendingTasks}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">System Status</h3>
                <p className="text-2xl font-bold text-[#1a2a6c]">{dashboardStats.systemStatus}</p>
              </div>
            </div>
            {/* Modern Recent Activity Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#1a2a6c] mb-6">Recent Activity</h2>
              {recentActivity.length === 0 ? (
                <p className="text-gray-600 text-center">No recent activity to display.</p>
              ) : (
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]"></div>
                  <ul className="space-y-8 pl-10">
                    {recentActivity.map((activity, index) => (
                      <li key={activity.id} className="relative flex items-start">
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-[-28px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                            index % 3 === 0
                              ? "bg-[#1a2a6c]"
                              : index % 3 === 1
                              ? "bg-[#b21f1f]"
                              : "bg-[#fdbb2d]"
                          }`}
                        ></div>
                        {/* Activity card */}
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full flex justify-between items-center">
                          <span className="text-gray-700 text-sm font-medium">{activity.action}</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      case "Users":
        return <User />;
      case "Activities":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#1a2a6c] mb-4">Pending Video Uploads</h2>
            {activities.length === 0 ? (
              <p className="text-gray-600">No pending activities.</p>
            ) : (
              <ul className="space-y-6">
                {activities.map((activity) => (
                  <li key={activity.id} className="border-b pb-4">
                    <p className="text-gray-700">
                      <strong>User ID:</strong> {activity.userId}
                    </p>
                    <p className="text-gray-700">
                      <strong>Uploaded:</strong> {new Date(activity.timestamp).toLocaleString()}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {activity.videos.map((videoUrl, index) => (
                        <div key={index}>
                          <p className="text-gray-600">{["North", "South", "East", "West"][index]}:</p>
                          <video
                            src={videoUrl}
                            controls
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handleApprove(activity.id)}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(activity.id)}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-[#1a2a6c]">{dashboardStats.totalUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">Active Sessions</h3>
                <p className="text-2xl font-bold text-[#1a2a6c]">{dashboardStats.activeSessions}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">Pending Tasks</h3>
                <p className="text-2xl font-bold text-[#b21f1f]">{dashboardStats.pendingTasks}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium">System Status</h3>
                <p className="text-2xl font-bold text-[#1a2a6c]">{dashboardStats.systemStatus}</p>
              </div>
            </div>
            {/* Modern Recent Activity Section (default case) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#1a2a6c] mb-6">Recent Activity</h2>
              {recentActivity.length === 0 ? (
                <p className="text-gray-600 text-center">No recent activity to display.</p>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]"></div>
                  <ul className="space-y-8 pl-10">
                    {recentActivity.map((activity, index) => (
                      <li key={activity.id} className="relative flex items-start">
                        <div
                          className={`absolute left-[-28px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                            index % 3 === 0
                              ? "bg-[#1a2a6c]"
                              : index % 3 === 1
                              ? "bg-[#b21f1f]"
                              : "bg-[#fdbb2d]"
                          }`}
                        ></div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full flex justify-between items-center">
                          <span className="text-gray-700 text-sm font-medium">{activity.action}</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ToastContainer />
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 flex flex-col ml-72">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold text-[#1a2a6c] mb-6">Admin Dashboard</h1>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;