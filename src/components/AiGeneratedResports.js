import React from "react";
import Header from './Header'
import Footer from "./Footer";



const AIGeneratedReports = () => {

  const dummyReportsData = {
    totalProcessed: 3,
    reports: [
      {
        id: "report1",
        userId: "user123",
        timestamp: "2025-04-10T14:32:00Z",
        trafficCounts: { north: 50, south: 30, east: 20, west: 40 },
        signalTimings: { north: 30, south: 25, east: 20, west: 35 },
      },
      {
        id: "report2",
        userId: "user123",
        timestamp: "2025-04-09T10:15:00Z",
        trafficCounts: { north: 45, south: 35, east: 25, west: 30 },
        signalTimings: { north: 28, south: 27, east: 22, west: 33 },
      },
      {
        id: "report3",
        userId: "user123",
        timestamp: "2025-04-08T09:00:00Z",
        trafficCounts: { north: 60, south: 40, east: 15, west: 45 },
        signalTimings: { north: 35, south: 30, east: 18, west: 40 },
      },
    ],
  };

 


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] mb-6">
          📊 AI-Generated Traffic Reports
        </h1>
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-[#1a2a6c] mb-2">Summary</h2>
            <p className="text-gray-700">
              <strong>Total Processed Activities:</strong> {dummyReportsData.totalProcessed}
            </p>
          </div>


          {/* Reports Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#1a2a6c] mb-4">Recent Reports</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white">
                    <th className="px-4 py-2 text-left">User ID</th>
                    <th className="px-4 py-2 text-left">Timestamp</th>
                    <th className="px-4 py-2 text-left">Traffic Counts</th>
                    <th className="px-4 py-2 text-left">Signal Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyReportsData.reports.map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="px-4 py-2 text-gray-700">{report.userId}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {new Date(report.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        N: {report.trafficCounts.north}, S: {report.trafficCounts.south}, 
                        E: {report.trafficCounts.east}, W: {report.trafficCounts.west}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        N: {report.signalTimings.north}s, S: {report.signalTimings.south}s, 
                        E: {report.signalTimings.east}s, W: {report.signalTimings.west}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default AIGeneratedReports;