import React from 'react';
import { Tourist } from '../../types';

interface MapViewProps {
  tourists: Tourist[];
}

const MapView: React.FC<MapViewProps> = ({ tourists }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-96">
      <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gray-100 opacity-50">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-100 to-blue-50" />
        </div>
        
        {/* Mock Tourist Markers */}
        {tourists.slice(0, 8).map((tourist, index) => {
          const getMarkerColor = (status: string) => {
            switch (status) {
              case 'safe': return 'bg-green-500';
              case 'warning': return 'bg-yellow-500';
              case 'critical': return 'bg-red-500';
              default: return 'bg-gray-500';
            }
          };

          return (
            <div
              key={tourist.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${20 + Math.floor(index / 4) * 30}%`,
              }}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getMarkerColor(tourist.status)} animate-pulse`}
                title={`${tourist.name} - ${tourist.status}`}
              />
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col gap-2">
            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 font-mono">+</button>
            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 font-mono">-</button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Status Legend</h4>
          <div className="space-y-1">
            {[
              { status: 'safe', color: 'bg-green-500', label: 'Safe' },
              { status: 'warning', color: 'bg-yellow-500', label: 'Warning' },
              { status: 'critical', color: 'bg-red-500', label: 'Critical' },
              { status: 'offline', color: 'bg-gray-500', label: 'Offline' },
            ].map(({ status, color, label }) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Interactive Map View</h3>
            <p className="text-sm text-gray-500">Real-time tourist locations in Dubai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
