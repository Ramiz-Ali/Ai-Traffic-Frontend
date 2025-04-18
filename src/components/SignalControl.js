import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import Header from './Header';
import Footer from './Footer';

const SignalControl = () => {
  // Example data for charts
  const signalData = [
    { name: 'Intersection A', green: 30, red: 20 },
    { name: 'Intersection B', green: 25, red: 25 },
    { name: 'Intersection C', green: 35, red: 15 },
    { name: 'Intersection D', green: 40, red: 10 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Signal Control</h1>
          <p className="text-gray-600">
            Monitor and manage traffic signal timings in real time.
          </p>
        </div>

        {/* Real-Time Signal Adjustments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Real-Time Signal Adjustments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Intersection A</h3>
              <p className="text-2xl font-bold text-green-600">Green: 30s</p>
              <p className="text-2xl font-bold text-red-600">Red: 20s</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Intersection B</h3>
              <p className="text-2xl font-bold text-green-600">Green: 25s</p>
              <p className="text-2xl font-bold text-red-600">Red: 25s</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Intersection C</h3>
              <p className="text-2xl font-bold text-green-600">Green: 35s</p>
              <p className="text-2xl font-bold text-red-600">Red: 15s</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Intersection D</h3>
              <p className="text-2xl font-bold text-green-600">Green: 40s</p>
              <p className="text-2xl font-bold text-red-600">Red: 10s</p>
            </div>
          </div>
        </div>

        {/* Intersection Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intersection Overview</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: '400px', width: '100%' }}
              className="rounded-md"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  Intersection A: Green - 30s, Red - 20s
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Insights</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              AI has extended the green light at <strong>Intersection A</strong> by 10 seconds to reduce congestion.
            </p>
            <p className="mt-2 text-gray-600">
              Predicted impact: <strong>20% reduction</strong> in wait times.
            </p>
          </div>
        </div>

        {/* Manual Override */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manual Override</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              Manually adjust signal timings for specific intersections.
            </p>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Override Signal Timings
              </button>
            </div>
          </div>
        </div>

        {/* Historical Performance */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historical Performance</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={signalData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="green" fill="#38a169" />
                <Bar dataKey="red" fill="#e53e3e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignalControl;