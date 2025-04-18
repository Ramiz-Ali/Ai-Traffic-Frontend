import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TrafficAnalysis = () => {
  // Sample Data for Chart
  const [trafficData, setTrafficData] = useState([
    { time: "8 AM", cars: 120, buses: 30, bikes: 50 },
    { time: "10 AM", cars: 200, buses: 40, bikes: 80 },
    { time: "12 PM", cars: 150, buses: 35, bikes: 60 },
    { time: "2 PM", cars: 180, buses: 38, bikes: 70 },
    { time: "4 PM", cars: 220, buses: 50, bikes: 90 },
    { time: "6 PM", cars: 300, buses: 60, bikes: 120 },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🚦 Traffic Analysis Dashboard
        </h1>

        {/* Real-Time Traffic Overview */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Real-Time Traffic Status
          </h2>
          <p className="text-gray-600">
            Live updates on traffic congestion levels across different intersections.
          </p>
          <div className="mt-4 flex justify-around">
            <div className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md">
              🚗 High Traffic
            </div>
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md">
              🚦 Moderate Traffic
            </div>
            <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md">
              🛣️ Smooth Flow
            </div>
          </div>
        </section>

        {/* Traffic Flow Chart */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Traffic Flow Analysis
          </h2>
          <p className="text-gray-600">Historical data trends of traffic congestion.</p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cars" stroke="#FF0000" name="Cars" />
              <Line type="monotone" dataKey="buses" stroke="#FFA500" name="Buses" />
              <Line type="monotone" dataKey="bikes" stroke="#008000" name="Bikes" />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Predicted Traffic Flow */}
        <section className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            AI-Powered Traffic Predictions
          </h2>
          <p className="text-gray-600">
            Based on past data, these are the expected traffic congestion levels for the next hours.
          </p>
          <div className="mt-4">
            <ul className="list-disc ml-6 text-gray-700">
              <li>🚗 **8 PM:** Moderate traffic expected at major intersections.</li>
              <li>🚗 **9 PM:** Traffic congestion likely to reduce by 30%.</li>
              <li>🚗 **10 PM:** Light traffic with smooth movement across roads.</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrafficAnalysis;
