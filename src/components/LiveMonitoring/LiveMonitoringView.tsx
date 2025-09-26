import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, AlertTriangle } from 'lucide-react';
import { generateMockTourists } from '../../utils/mockData';
import TouristCard from './TouristCard';
import MapView from './MapView';

const LiveMonitoringView: React.FC = () => {
  const [tourists] = useState(generateMockTourists(12));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tourist.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    safe: tourists.filter(t => t.status === 'safe').length,
    warning: tourists.filter(t => t.status === 'warning').length,
    critical: tourists.filter(t => t.status === 'critical').length,
    offline: tourists.filter(t => t.status === 'offline').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Monitoring</h2>
          <p className="text-gray-600 mt-1">Real-time tourist location and safety tracking</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Map View
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                status === 'safe' ? 'bg-green-500' :
                status === 'warning' ? 'bg-yellow-500' :
                status === 'critical' ? 'bg-red-500' :
                'bg-gray-500'
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tourists by name or nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="safe">Safe</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTourists.map(tourist => (
            <TouristCard key={tourist.id} tourist={tourist} />
          ))}
        </div>
      ) : (
        <MapView tourists={filteredTourists} />
      )}
    </div>
  );
};

export default LiveMonitoringView;
