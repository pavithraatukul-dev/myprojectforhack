import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2, MapPin, AlertTriangle } from 'lucide-react';
import { generateMockGeofences } from '../../utils/mockData';
import { GeofenceZone } from '../../types';
import { motion } from 'framer-motion';

const GeofenceManagementView: React.FC = () => {
  const [geofences, setGeofences] = useState(generateMockGeofences());
  const [selectedGeofence, setSelectedGeofence] = useState<GeofenceZone | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<GeofenceZone>>({
    name: '',
    type: 'safe_zone',
    severity: 'info',
    description: '',
    isActive: true,
    rules: {
      allowEntry: true,
      requiresPermission: false,
      alertOnEntry: false,
      alertOnExit: false,
    }
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'safe_zone': return 'bg-green-100 text-green-800 border-green-200';
      case 'restricted': return 'bg-red-100 text-red-800 border-red-200';
      case 'emergency': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      const newGeofence: GeofenceZone = {
        ...formData,
        id: Date.now().toString(),
        coordinates: [
          { lat: 25.0776, lng: 55.1391 },
          { lat: 25.0876, lng: 55.1391 },
          { lat: 25.0876, lng: 55.1491 },
          { lat: 25.0776, lng: 55.1491 }
        ]
      } as GeofenceZone;
      setGeofences(prev => [...prev, newGeofence]);
    } else if (selectedGeofence) {
      setGeofences(prev => prev.map(g => 
        g.id === selectedGeofence.id ? { ...selectedGeofence, ...formData } : g
      ));
    }
    setIsCreating(false);
    setSelectedGeofence(null);
    setFormData({
      name: '',
      type: 'safe_zone',
      severity: 'info',
      description: '',
      isActive: true,
      rules: {
        allowEntry: true,
        requiresPermission: false,
        alertOnEntry: false,
        alertOnExit: false,
      }
    });
  };

  const toggleGeofenceStatus = (id: string) => {
    setGeofences(prev => prev.map(g => 
      g.id === id ? { ...g, isActive: !g.isActive } : g
    ));
  };

  const deleteGeofence = (id: string) => {
    setGeofences(prev => prev.filter(g => g.id !== id));
    if (selectedGeofence?.id === id) {
      setSelectedGeofence(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Geofence Management</h2>
          <p className="text-gray-600 mt-1">Configure and monitor geo-fenced safety zones</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Create Zone
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Zones</p>
              <p className="text-2xl font-bold text-gray-900">{geofences.length}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {geofences.filter(g => g.isActive).length}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Restricted</p>
              <p className="text-2xl font-bold text-red-600">
                {geofences.filter(g => g.type === 'restricted').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Safe Zones</p>
              <p className="text-2xl font-bold text-blue-600">
                {geofences.filter(g => g.type === 'safe_zone').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geofence List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Geofence Zones</h3>
          {geofences.map((geofence) => (
            <motion.div
              key={geofence.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg border p-4 transition-all ${
                selectedGeofence?.id === geofence.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{geofence.name}</h4>
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(geofence.severity)}`} />
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(geofence.type)}`}>
                    {geofence.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleGeofenceStatus(geofence.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      geofence.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {geofence.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGeofence(geofence);
                      setFormData(geofence);
                      setIsCreating(false);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteGeofence(geofence.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{geofence.description}</p>
              
              <div className="text-xs text-gray-500">
                <div className="grid grid-cols-2 gap-2">
                  <span>Entry: {geofence.rules.allowEntry ? 'Allowed' : 'Restricted'}</span>
                  <span>Alert on Entry: {geofence.rules.alertOnEntry ? 'Yes' : 'No'}</span>
                  <span>Permission Req: {geofence.rules.requiresPermission ? 'Yes' : 'No'}</span>
                  <span>Alert on Exit: {geofence.rules.alertOnExit ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {(isCreating || selectedGeofence) ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isCreating ? 'Create New Geofence' : 'Edit Geofence'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone Type</label>
                  <select
                    value={formData.type || 'safe_zone'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as GeofenceZone['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="safe_zone">Safe Zone</option>
                    <option value="restricted">Restricted</option>
                    <option value="emergency">Emergency</option>
                    <option value="tourist_area">Tourist Area</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    value={formData.severity || 'info'}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as GeofenceZone['severity'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Zone Rules</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rules?.allowEntry || false}
                        onChange={(e) => setFormData({
                          ...formData,
                          rules: { ...formData.rules!, allowEntry: e.target.checked }
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Allow Entry</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rules?.requiresPermission || false}
                        onChange={(e) => setFormData({
                          ...formData,
                          rules: { ...formData.rules!, requiresPermission: e.target.checked }
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Requires Permission</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rules?.alertOnEntry || false}
                        onChange={(e) => setFormData({
                          ...formData,
                          rules: { ...formData.rules!, alertOnEntry: e.target.checked }
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Alert on Entry</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rules?.alertOnExit || false}
                        onChange={(e) => setFormData({
                          ...formData,
                          rules: { ...formData.rules!, alertOnExit: e.target.checked }
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Alert on Exit</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isCreating ? 'Create Zone' : 'Update Zone'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setSelectedGeofence(null);
                      setFormData({
                        name: '',
                        type: 'safe_zone',
                        severity: 'info',
                        description: '',
                        isActive: true,
                        rules: {
                          allowEntry: true,
                          requiresPermission: false,
                          alertOnEntry: false,
                          alertOnExit: false,
                        }
                      });
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a geofence to edit or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeofenceManagementView;
