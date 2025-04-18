import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = "http://localhost:5000/upload"; // Backend URL for uploads

function UploadVideos() {
  const [selectedFiles, setSelectedFiles] = useState({
    north: null,
    south: null,
    east: null,
    west: null,
  });
  const [activityId, setActivityId] = useState(null); // Track activity ID
  const [result, setResult] = useState(null); // Backend results
  const [status, setStatus] = useState(""); // Pending, Approved, Rejected
  const [loading, setLoading] = useState(false);

  // Assume userId is stored in localStorage or context
  const userId = localStorage.getItem("userId") || "user123"; // Replace with actual user ID retrieval

  const handleFileChange = (e, direction) => {
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [direction]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate: Ensure all 4 files are selected
    if (!selectedFiles.north || !selectedFiles.south || !selectedFiles.east || !selectedFiles.west) {
      toast.error("Please upload exactly 4 videos.", { position: "top-right" });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("videos", selectedFiles.north);
    formData.append("videos", selectedFiles.south);
    formData.append("videos", selectedFiles.east);
    formData.append("videos", selectedFiles.west);
    formData.append("userId", userId); // Include userId

    try {
      const response = await axios.post(BACKEND_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setActivityId(response.data.activityId); // Store activity ID
      setStatus("pending"); // Set initial status
      toast.success("Videos submitted to admin!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading videos.", { position: "top-right" });
    }

    setLoading(false);
  };

  // Poll for status/results when activityId exists
  useEffect(() => {
    if (!activityId) return;

    const checkStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/results/${activityId}`);
        const { status, result } = response.data;
        setStatus(status);
        if (status === "approved" && result) {
          setResult(result); // Set results if approved
          toast.success("Videos approved! Results received.", { position: "top-right" });
          // Reset activityId to allow new uploads
          setActivityId(null);
          setSelectedFiles({ north: null, south: null, east: null, west: null });
        } else if (status === "rejected") {
          toast.error("Your videos are rejected by admin.", {
            position: "top-right",
          });
          // Reset activityId to allow new uploads
          setActivityId(null);
          setSelectedFiles({ north: null, south: null, east: null, west: null });
        }
      } catch (error) {
        console.error("Error checking status:", error);
        toast.error("Error checking status.", { position: "top-right" });
      }
    };

    const interval = setInterval(checkStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, [activityId]);

  return (
    <div className="relative py-12 px-20 bg-white">
      {/* Toast Container */}
      <ToastContainer />
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] mb-4">
          🚗 AI Based Traffic Management
        </h1>
        <hr className="mb-6 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                📹 Upload Your Traffic Videos
              </h2>
              <p className="text-gray-600 mb-4">
                Select 4 videos showing different roads at an intersection. Your videos will be reviewed by an admin before processing.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["north", "south", "east", "west"].map((direction) => (
                  <div key={direction}>
                    <label className="block text-sm font-medium text-gray-700">
                      🚦 {direction.charAt(0).toUpperCase() + direction.slice(1)} Road:
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, direction)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading || (activityId && status === "pending")} // Disable during pending
                  className="w-full bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white py-2 px-4 rounded-md hover:from-[#1a2a6c] hover:to-[#b21f1f] transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {loading
                    ? "Uploading..."
                    : activityId && status === "pending"
                    ? "Awaiting Approval"
                    : "Upload Videos"}
                </button>
              </form>
            </section>
          </div>

          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            {!activityId && !loading && !result && status !== "rejected" && (
              <p className="text-gray-500 text-center">
                Upload videos to see results <br />
                <span className="text-2xl">🚦🚦🚦🚦</span>
              </p>
            )}
            {loading && (
              <p className="text-gray-600 text-center">Uploading videos...</p>
            )}
            {activityId && status === "pending" && (
              <p className="text-gray-600 text-center">Your videos are pending admin approval...</p>
            )}
            {status === "rejected" && (
              <p className="text-red-600 text-center">Your videos were rejected by the admin.</p>
            )}
            {result && status === "approved" && (
              <>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                  ✅ Optimization Results
                </h2>
                <p className="text-gray-600 mb-4">
                  Here are the recommended green times for each direction:
                </p>
                <ul className="space-y-2">
                  {["north", "south", "east", "west"].map((direction) => (
                    <li key={direction} className="text-gray-700">
                      🚦 {direction.charAt(0).toUpperCase() + direction.slice(1)}:{" "}
                      <span className="font-semibold">{result[direction]}</span> seconds
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default UploadVideos;