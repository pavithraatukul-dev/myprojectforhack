import React, { useState } from 'react';
import { Users, Search, Filter, UserPlus, MapPin, Shield, Phone, Mail } from 'lucide-react';
import { generateMockTourists } from '../../utils/mockData';
import { Tourist } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const TouristManagementView: React.FC = () => {
  const [tourists, setTourists] = useState(generateMockTourists(20));
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.digitalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tourist.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const updateTouristStatus = (touristId: string, newStatus: Tourist['status']) => {
    setTourists(prev => prev.map(tourist => 
      tourist.id === touristId ? { ...tourist, status: newStatus } : tourist
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tourist Management</h2>
          <p className="text-gray-600 mt-1">Manage tourist profiles and digital identities</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4 inline mr-2" />
          Add Tourist
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tourists</p>
              <p className="text-2xl font-bold text-gray-900">{tourists.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Safe</p>
              <p className="text-2xl font-bold text-green-600">
                {tourists.filter(t => t.status === 'safe').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tourists.filter(t => t.status === 'warning' || t.status === 'critical').length}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Safety Score</p>
              <p className="text-2xl font-bold text-blue-600">
                {(tourists.reduce((sum, t) => sum + t.safetyScore, 0) / tourists.length).toFixed(1)}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, nationality, or digital ID..."
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Registered Tourists</h3>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredTourists.map((tourist) => (
              <motion.div
                key={tourist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
                  selectedTourist?.id === tourist.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:shadow-md'
                }`}
                onClick={() => setSelectedTourist(tourist)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{tourist.name}</h4>
                    <p className="text-sm text-gray-600">{tourist.nationality}</p>
                    <p className="text-xs text-gray-500 font-mono">{tourist.digitalId}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(tourist.status)}`}>
                    {tourist.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{tourist.currentZone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Safety: {tourist.safetyScore}/100</span>
                    <div className={`w-2 h-2 rounded-full ${
                      tourist.safetyScore >= 85 ? 'bg-green-500' :
                      tourist.safetyScore >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tourist Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedTourist ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Tourist Profile</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedTourist.status)}`}>
                  {selectedTourist.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{selectedTourist.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nationality</label>
                    <p className="text-gray-900">{selectedTourist.nationality}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Digital ID</label>
                  <p className="text-gray-900 font-mono text-sm">{selectedTourist.digitalId}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Current Location</label>
                  <p className="text-gray-900">{selectedTourist.currentZone}</p>
                  <p className="text-xs text-gray-500">
                    {selectedTourist.location.lat.toFixed(6)}, {selectedTourist.location.lng.toFixed(6)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Last Activity</label>
                  <p className="text-gray-900">
                    {formatDistanceToNow(new Date(selectedTourist.lastActivity), { addSuffix: true })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Safety Score</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedTourist.safetyScore >= 85 ? 'bg-green-500' :
                          selectedTourist.safetyScore >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedTourist.safetyScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedTourist.safetyScore}/100</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Device Status</label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="text-sm">
                      <span className="text-gray-600">Battery: </span>
                      <span className={`font-medium ${
                        selectedTourist.deviceInfo.batteryLevel > 50 ? 'text-green-600' :
                        selectedTourist.deviceInfo.batteryLevel > 20 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedTourist.deviceInfo.batteryLevel}%
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Connection: </span>
                      <span className={`font-medium capitalize ${
                        selectedTourist.deviceInfo.connectivity === 'online' ? 'text-green-600' :
                        selectedTourist.deviceInfo.connectivity === 'low_signal' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedTourist.deviceInfo.connectivity.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Emergency Contacts</label>
                  <div className="mt-1 space-y-2">
                    {selectedTourist.emergencyContacts.map((contact, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-600 capitalize">{contact.relationship}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Update Status</label>
                  <select
                    value={selectedTourist.status}
                    onChange={(e) => updateTouristStatus(selectedTourist.id, e.target.value as Tourist['status'])}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="safe">Safe</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Tourist
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Track Location
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a tourist to view their profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TouristManagementView;
