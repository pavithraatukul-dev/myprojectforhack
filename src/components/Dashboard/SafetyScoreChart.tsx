import React from 'react';
import { TrendingUp } from 'lucide-react';

const SafetyScoreChart: React.FC = () => {
  const data = [
    { time: '00:00', score: 85 },
    { time: '04:00', score: 88 },
    { time: '08:00', score: 92 },
    { time: '12:00', score: 87 },
    { time: '16:00', score: 89 },
    { time: '20:00', score: 91 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Safety Score Trend</h3>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+3.2% today</span>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-200 rounded-t-lg transition-all duration-500 hover:bg-blue-300"
              style={{ height: `${(point.score / 100) * 100}%` }}
            >
              <div
                className="w-full bg-blue-600 rounded-t-lg"
                style={{ height: `${Math.min(point.score / 100 * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-2">{point.time}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current Average</span>
          <span className="font-semibold text-gray-900">87.3</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyScoreChart;
