import React from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  Shield, 
  Activity, 
  Settings, 
  BarChart3,
  Radio,
  Lock,
  Smartphone
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
}

const navigation = [
  { name: 'Dashboard', icon: Activity, view: 'dashboard' },
  { name: 'Live Monitoring', icon: MapPin, view: 'monitoring' },
  { name: 'Incidents', icon: AlertTriangle, view: 'incidents' },
  { name: 'Tourist Management', icon: Users, view: 'tourists' },
  { name: 'Tourist App', icon: Smartphone, view: 'tourist-app' },
  { name: 'Geofence Zones', icon: Shield, view: 'geofences' },
  { name: 'Responders', icon: Radio, view: 'responders' },
  { name: 'Digital ID', icon: Lock, view: 'digital-id' },
  { name: 'Analytics', icon: BarChart3, view: 'analytics' },
  { name: 'Settings', icon: Settings, view: 'settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen }) => {
  return (
    <aside 
      className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => onViewChange(item.view)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                  currentView === item.view
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">System Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
