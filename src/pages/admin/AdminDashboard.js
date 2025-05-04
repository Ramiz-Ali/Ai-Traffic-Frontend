import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, updateDoc, collection, setDoc, query, where } from "firebase/firestore";
import axios from "axios";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import User from "./User";
import { routes } from "../../contant";

const BACKEND_URL = "http://localhost:5000";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Overview");
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    pendingTasks: 0,
    systemStatus: "Loading...",
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingResults, setPendingResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("onAuthStateChanged triggered. Current user:", currentUser?.uid);
      console.log("Current location:", location.pathname);

      if (currentUser) {
        setUserId(currentUser.uid);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role || "user";
            console.log("User role fetched:", role);
            setUserRole(role);
          } else {
            console.log("User document does not exist in Firestore.");
            toast.error("User profile not found.", { position: "top-right" });
            navigate(routes.signin, { replace: true });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          toast.error("Failed to verify user role.", { position: "top-right" });
          navigate(routes.signin, { replace: true });
        }
      } else {
        console.log("No user signed in, redirecting to signin");
        if (location.pathname !== routes.signin) {
          navigate(routes.signin, { replace: true });
        }
      }
      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up onAuthStateChanged listener");
      unsubscribe();
    };
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (isLoading) {
      console.log("Skipping data fetch: still loading");
      return;
    }

    const fetchDashboardData = async () => {
      console.log("Fetching dashboard data for section:", activeSection);
      try {
        // Fetch dashboard stats
        const statsResponse = await axios.get(`${BACKEND_URL}/dashboard/stats`);
        console.log("Dashboard stats fetched:", statsResponse.data);
        setDashboardStats(statsResponse.data);

        // Fetch recent activity
        const activityResponse = await axios.get(`${BACKEND_URL}/dashboard/recent-activity`);
        console.log("Recent activities fetched:", activityResponse.data);
        setRecentActivity(activityResponse.data);

        // Fetch pending results (for admins)
        if (userRole === "admin" && activeSection === "Results") {
          console.log("Fetching pending results for admin...");
          const activitiesRef = collection(db, "activities");
          const activitySnapshot = await getDocs(activitiesRef);
          console.log("Total activities fetched:", activitySnapshot.docs.length);
          const pending = activitySnapshot.docs
            .map((doc) => {
              const data = doc.data();
              console.log("Activity:", { id: doc.id, ...data });
              return {
                id: doc.id,
                ...data,
                timestamp: data.timestamp?.toDate() || new Date(),
              };
            })
            .filter((activity) => {
              const isPending = activity.status === "pending";
              console.log(`Checking status for activity ${activity.id}: ${activity.status}, isPending: ${isPending}`);
              return isPending;
            });
          console.log("Pending results after filter:", pending);
          setPendingResults(pending);
        }

        // Fetch user results (for all users)
        if (userId && activeSection === "Results") {
          console.log("Fetching user results for userId:", userId);
          const resultsQuery = query(
            collection(db, "userResults"),
            where("userId", "==", userId)
          );
          const resultsSnapshot = await getDocs(resultsQuery);
          const results = resultsSnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("User result:", { id: doc.id, ...data });
            return {
              id: doc.id,
              ...data,
              timestamp: data.timestamp?.toDate() || new Date(),
            };
          });
          console.log("User results fetched:", results);
          setUserResults(results);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data.", { position: "top-right" });
      }
    };

    fetchDashboardData();
  }, [isLoading, activeSection, userRole, userId]);

  const handleApprove = async (activityId, userId, results) => {
    try {
      console.log(`Approving activity ${activityId} for user ${userId} with results:`, results);
      const activityDocRef = doc(db, "activities", activityId);
      await updateDoc(activityDocRef, {
        status: "approved",
        updatedAt: new Date(),
      });
      console.log(`Updated activity ${activityId} status to 'approved'`);

      // Store results in userResults collection
      const resultId = `${userId}_${Date.now()}`;
      const resultData = {
        userId,
        results,
        timestamp: new Date(),
      };
      await setDoc(doc(db, "userResults", resultId), resultData);
      console.log(`Stored result in userResults with ID ${resultId}:`, resultData);

      setPendingResults(pendingResults.filter((activity) => activity.id !== activityId));
      toast.success("Result approved successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error approving result:", error);
      toast.error("Failed to approve result.", { position: "top-right" });
    }
  };

  const handleReject = async (activityId) => {
    try {
      console.log(`Rejecting activity ${activityId}`);
      const activityDocRef = doc(db, "activities", activityId);
      await updateDoc(activityDocRef, {
        status: "rejected",
        updatedAt: new Date(),
      });
      console.log(`Updated activity ${activityId} status to 'rejected'`);

      setPendingResults(pendingResults.filter((activity) => activity.id !== activityId));
      toast.success("Result rejected successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error rejecting result:", error);
      toast.error("Failed to reject result.", { position: "top-right" });
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  const renderSection = () => {
    console.log("Rendering section:", activeSection);
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
      case "Users":
        return <User />;
      case "Results":
        if (userRole === "admin") {
          return (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#1a2a6c] mb-4">Pending Results for Approval</h2>
              {pendingResults.length === 0 ? (
                <p className="text-gray-600">No pending results.</p>
              ) : (
                <ul className="space-y-6">
                  {pendingResults.map((activity) => (
                    <li key={activity.id} className="border-b pb-4">
                      <p className="text-gray-700">
                        <strong>User ID:</strong> {activity.userId}
                      </p>
                      <p className="text-gray-700">
                        <strong>Uploaded:</strong> {new Date(activity.timestamp).toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <h3 className="text-gray-700 font-semibold">Results:</h3>
                        <ul className="space-y-1">
                          {["north", "south", "east", "west"].map((direction) => (
                            <li key={direction} className="text-gray-600">
                              {direction.charAt(0).toUpperCase() + direction.slice(1)}: {activity.results[direction]} seconds
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => handleApprove(activity.id, activity.userId, activity.results)}
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
        }
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#1a2a6c] mb-4">Your Approved Results</h2>
            {userResults.length === 0 ? (
              <p className="text-gray-600">No approved results yet.</p>
            ) : (
              <ul className="space-y-6">
                {userResults.map((result) => (
                  <li key={result.id} className="border-b pb-4">
                    <p className="text-gray-700">
                      <strong>Processed:</strong> {new Date(result.timestamp).toLocaleString()}
                    </p>
                    <ul className="space-y-1 mt-2">
                      {["north", "south", "east", "west"].map((direction) => (
                        <li key={direction} className="text-gray-600">
                          {direction.charAt(0).toUpperCase() + direction.slice(1)}: {result.results[direction]} seconds
                        </li>
                      ))}
                    </ul>
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
          <h1 className="text-3xl font-bold text-[#1a2a6c] mb-6">Dashboard</h1>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;