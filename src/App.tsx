import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardView from './components/Dashboard/DashboardView';
import LiveMonitoringView from './components/LiveMonitoring/LiveMonitoringView';
import TouristAppView from './components/TouristApp/TouristAppView';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'monitoring':
        return <LiveMonitoringView />;
      case 'tourist-app':
        return <TouristAppView />;
      case 'incidents':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Incident Management</h2>
            <p className="text-gray-600 mt-1">Manage and respond to tourist safety incidents</p>
            <div className="mt-8 text-center text-gray-500">
              Incident management interface coming soon...
            </div>
          </div>
        );
      case 'tourists':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Tourist Management</h2>
            <p className="text-gray-600 mt-1">Manage tourist profiles and digital identities</p>
            <div className="mt-8 text-center text-gray-500">
              Tourist management interface coming soon...
            </div>
          </div>
        );
      case 'geofences':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Geofence Management</h2>
            <p className="text-gray-600 mt-1">Configure and monitor geo-fenced safety zones</p>
            <div className="mt-8 text-center text-gray-500">
              Geofence management interface coming soon...
            </div>
          </div>
        );
      case 'responders':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Responder Network</h2>
            <p className="text-gray-600 mt-1">Coordinate emergency response teams and resources</p>
            <div className="mt-8 text-center text-gray-500">
              Responder management interface coming soon...
            </div>
          </div>
        );
      case 'digital-id':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Digital Identity Management</h2>
            <p className="text-gray-600 mt-1">Blockchain-based digital ID verification and management</p>
            <div className="mt-8 text-center text-gray-500">
              Digital identity interface coming soon...
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            <p className="text-gray-600 mt-1">Safety trends, incident analysis, and performance metrics</p>
            <div className="mt-8 text-center text-gray-500">
              Analytics dashboard coming soon...
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
            <p className="text-gray-600 mt-1">Configure system parameters and preferences</p>
            <div className="mt-8 text-center text-gray-500">
              Settings interface coming soon...
            </div>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={sidebarOpen}
        />
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            currentView={currentView}
            onViewChange={setCurrentView}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <main className="flex-1 overflow-auto">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
