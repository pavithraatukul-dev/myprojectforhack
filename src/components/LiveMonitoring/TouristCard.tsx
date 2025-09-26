import React from 'react';
import { MapPin, Battery, Signal, Clock, AlertTriangle } from 'lucide-react';
import { Tourist } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface TouristCardProps {
  tourist: Tourist;
}

const TouristCard: React.FC<TouristCardProps> = ({ tourist }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConnectivityIcon = (connectivity: string) => {
    switch (connectivity) {
      case 'online': return <Signal className="w-4 h-4 text-green-600" />;
      case 'low_signal': return <Signal className="w-4 h-4 text-yellow-600" />;
      default: return <Signal className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{tourist.name}</h3>
          <p className="text-sm text-gray-600">{tourist.nationality}</p>
          <p className="text-xs text-gray-500 font-mono">{tourist.digitalId}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(tourist.status)}`}>
          {tourist.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{tourist.currentZone}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Last active {formatDistanceToNow(new Date(tourist.lastActivity), { addSuffix: true })}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{tourist.deviceInfo.batteryLevel}%</span>
          </div>
          <div className="flex items-center gap-1">
            {getConnectivityIcon(tourist.deviceInfo.connectivity)}
            <span className="text-xs text-gray-500 capitalize">
              {tourist.deviceInfo.connectivity.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Safety Score</span>
            <div className="flex items-center gap-2">
              {tourist.safetyScore < 70 && <AlertTriangle className="w-4 h-4 text-red-500" />}
              <span className={`font-bold ${
                tourist.safetyScore >= 85 ? 'text-green-600' :
                tourist.safetyScore >= 70 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {tourist.safetyScore}/100
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${
                tourist.safetyScore >= 85 ? 'bg-green-500' :
                tourist.safetyScore >= 70 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${tourist.safetyScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="flex-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          View Details
        </button>
        <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          Contact
        </button>
      </div>
    </div>
  );
};

export default TouristCard;
