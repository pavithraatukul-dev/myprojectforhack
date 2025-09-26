import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import { generateMockIncidents } from '../../utils/mockData';
import { Incident } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const IncidentManagementView: React.FC = () => {
  const [incidents, setIncidents] = useState(generateMockIncidents(15));
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'responding': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateIncidentStatus = (incidentId: string, newStatus: Incident['status']) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId ? { ...incident, status: newStatus } : incident
    ));
  };

  const assignResponder = (incidentId: string, responder: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId ? { ...incident, assignedResponder: responder } : incident
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incident Management</h2>
          <p className="text-gray-600 mt-1">Monitor and respond to tourist safety incidents</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Create Manual Incident
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-red-600">
                {incidents.filter(i => i.status === 'active').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Responding</p>
              <p className="text-2xl font-bold text-orange-600">
                {incidents.filter(i => i.status === 'responding').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {incidents.filter(i => i.status === 'resolved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-blue-600">4.2m</p>
            </div>
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="responding">Responding</option>
          <option value="resolved">Resolved</option>
          <option value="false_alarm">False Alarm</option>
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Incidents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
                selectedIncident?.id === incident.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => setSelectedIncident(incident)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{incident.touristName}</h3>
                  <p className="text-sm text-gray-600 capitalize">{incident.type.replace('_', ' ')}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">{incident.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{incident.location.address}</span>
                </div>
              </div>

              {incident.assignedResponder && (
                <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                  <User className="w-3 h-3" />
                  <span>Assigned: {incident.assignedResponder}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Incident Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedIncident ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Incident Details</h3>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Tourist</label>
                  <p className="text-gray-900">{selectedIncident.touristName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <p className="text-gray-900 capitalize">{selectedIncident.type.replace('_', ' ')}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900">{selectedIncident.location.address}</p>
                  <p className="text-xs text-gray-500">
                    {selectedIncident.location.lat.toFixed(6)}, {selectedIncident.location.lng.toFixed(6)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">AI Confidence</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedIncident.aiConfidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{(selectedIncident.aiConfidence * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={selectedIncident.status}
                    onChange={(e) => updateIncidentStatus(selectedIncident.id, e.target.value as Incident['status'])}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="responding">Responding</option>
                    <option value="resolved">Resolved</option>
                    <option value="false_alarm">False Alarm</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Assigned Responder</label>
                  <input
                    type="text"
                    value={selectedIncident.assignedResponder || ''}
                    onChange={(e) => assignResponder(selectedIncident.id, e.target.value)}
                    placeholder="Assign responder..."
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Tourist
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Dispatch Help
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select an incident to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentManagementView;
