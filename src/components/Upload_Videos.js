import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000/process-videos"; // Python backend URL

const UploadVideos = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    north: null,
    south: null,
    east: null,
    west: null,
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const fileInputs = useRef({
    north: null,
    south: null,
    east: null,
    west: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e, direction) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["video/mp4", "video/quicktime"];
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type for ${direction}. Please upload MP4 or MOV.`, {
          position: "top-right",
        });
        return;
      }
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [direction]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please sign in to upload videos.", { position: "top-right" });
      return;
    }

    if (!selectedFiles.north || !selectedFiles.south || !selectedFiles.east || !selectedFiles.west) {
      toast.error("Please upload exactly 4 videos.", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      // Create FormData to send video files
      const formData = new FormData();
      formData.append("userId", userId);
      ["north", "south", "east", "west"].forEach((direction) => {
        formData.append(direction, selectedFiles[direction]);
      });

      // Send video files to the backend
      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { results, activityId } = response.data; // Expecting { userId, activityId, results }

      // Store activity metadata in Firestore
      await setDoc(doc(db, "activities", activityId), {
        userId,
        results,
        status: "pending",
        timestamp: new Date(),
      });

      toast.success("Videos submitted for admin review!", { position: "top-right" });

      // Reset form
      setSelectedFiles({ north: null, south: null, east: null, west: null });
      ["north", "south", "east", "west"].forEach((direction) => {
        if (fileInputs.current[direction]) {
          fileInputs.current[direction].value = "";
        }
      });
    } catch (error) {
      console.error("Error processing videos:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: BACKEND_URL,
      });
      let errorMessage = "Error processing videos.";
      if (error.response?.status === 400) {
        errorMessage = error.response.data.error || "Invalid request. Please check your inputs.";
      } else if (error.response?.status === 500) {
        errorMessage = error.response.data.error || "Server error. Please try again later.";
      } else {
        errorMessage = `Network error: ${error.message}`;
      }
      toast.error(errorMessage, { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <div className="relative py-12 px-20 bg-white">
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
                Select 4 videos showing different roads at an intersection. Results will be available after admin approval.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["north", "south", "east", "west"].map((direction) => (
                  <div key={direction}>
                    <label className="block text-sm font-medium text-gray-700">
                      🚦 {direction.charAt(0).toUpperCase() + direction.slice(1)} Road:
                    </label>
                    <input
                      type="file"
                      accept="video/mp4,video/quicktime"
                      onChange={(e) => handleFileChange(e, direction)}
                      ref={(el) => (fileInputs.current[direction] = el)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white py-2 px-4 rounded-md hover:from-[#1a2a6c] hover:to-[#b21f1f] transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Upload Videos for Review"}
                </button>
              </form>
            </section>
          </div>

          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            {loading ? (
              <p className="text-gray-600 text-center">Submitting videos...</p>
            ) : (
              <p className="text-gray-500 text-center">
                Videos submitted. Awaiting admin approval. <br />
                <span className="text-2xl">🚦🚦🚦🚦</span>
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UploadVideos;