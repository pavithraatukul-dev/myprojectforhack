import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { generateMockIncidents } from '../../utils/mockData';
import { formatDistanceToNow } from 'date-fns';

const RecentIncidents: React.FC = () => {
  const incidents = generateMockIncidents(5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Incidents</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-lg border ${getSeverityColor(incident.severity)}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {incident.touristName}
                </p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
              
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{incident.location.address}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIncidents;
