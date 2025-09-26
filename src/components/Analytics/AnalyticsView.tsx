import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, Clock, MapPin, Users, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsView: React.FC = () => {
  const analyticsData = {
    incidentTrends: [
      { month: 'Jan', incidents: 45, resolved: 42 },
      { month: 'Feb', incidents: 52, resolved: 48 },
      { month: 'Mar', incidents: 38, resolved: 36 },
      { month: 'Apr', incidents: 41, resolved: 39 },
      { month: 'May', incidents: 36, resolved: 34 },
      { month: 'Jun', incidents: 29, resolved: 28 },
    ],
    responseMetrics: {
      avgResponseTime: 4.2,
      resolutionRate: 94.5,
      falsePositiveRate: 8.3,
      aiAccuracy: 91.7
    },
    popularZones: [
      { name: 'Dubai Mall Area', visitors: 2847, incidents: 12 },
      { name: 'Dubai Marina', visitors: 2156, incidents: 8 },
      { name: 'JBR Beach', visitors: 1943, incidents: 15 },
      { name: 'Burj Khalifa District', visitors: 1674, incidents: 6 },
      { name: 'Old Dubai Souks', visitors: 1235, incidents: 9 },
    ],
    safetyTrends: [
      { time: '00:00', score: 88 },
      { time: '04:00', score: 92 },
      { time: '08:00', score: 87 },
      { time: '12:00', score: 83 },
      { time: '16:00', score: 85 },
      { time: '20:00', score: 89 },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600 mt-1">Safety trends, incident analysis, and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">{analyticsData.responseMetrics.avgResponseTime}m</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">-12% vs last month</span>
              </div>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-green-600">{analyticsData.responseMetrics.resolutionRate}%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+3% vs last month</span>
              </div>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-2xl font-bold text-purple-600">{analyticsData.responseMetrics.aiAccuracy}%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5% vs last month</span>
              </div>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">False Positive Rate</p>
              <p className="text-2xl font-bold text-yellow-600">{analyticsData.responseMetrics.falsePositiveRate}%</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">-2% vs last month</span>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Incident Trends</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-600">Incidents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-600">Resolved</span>
              </div>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-4">
            {analyticsData.incidentTrends.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col gap-1 h-48 justify-end">
                  <div
                    className="w-full bg-red-200 rounded-t-lg relative"
                    style={{ height: `${(data.incidents / 60) * 100}%` }}
                  >
                    <div
                      className="w-full bg-red-500 rounded-t-lg absolute bottom-0"
                      style={{ height: `${(data.incidents / 60) * 100}%` }}
                    />
                  </div>
                  <div
                    className="w-full bg-green-200 rounded-t-lg relative"
                    style={{ height: `${(data.resolved / 60) * 100}%` }}
                  >
                    <div
                      className="w-full bg-green-500 rounded-t-lg absolute bottom-0"
                      style={{ height: `${(data.resolved / 60) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Safety Score Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Safety Score</h3>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+2.1% today</span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2">
            {analyticsData.safetyTrends.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-200 rounded-t-lg transition-all duration-500 hover:bg-blue-300 relative"
                  style={{ height: `${(point.score / 100) * 200}px` }}
                >
                  <div
                    className="w-full bg-blue-600 rounded-t-lg absolute bottom-0"
                    style={{ height: `${(point.score / 100) * 200}px` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">{point.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Popular Zones Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tourist Zones</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Zone Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Visitors</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Incidents</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Safety Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.popularZones.map((zone, index) => {
                const safetyRate = ((zone.visitors - zone.incidents) / zone.visitors * 100).toFixed(1);
                const isGoodSafety = parseFloat(safetyRate) >= 99;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{zone.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-900">{zone.visitors.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        zone.incidents <= 8 ? 'bg-green-100 text-green-800' :
                        zone.incidents <= 12 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {zone.incidents}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${isGoodSafety ? 'text-green-600' : 'text-yellow-600'}`}>
                        {safetyRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {isGoodSafety ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-yellow-600" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsView;
