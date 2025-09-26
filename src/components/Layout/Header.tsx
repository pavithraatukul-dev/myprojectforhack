import React from 'react';
import { Shield, Bell, Settings, User, Menu } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SafeTour</h1>
              <p className="text-sm text-gray-500">Smart Tourist Safety Monitoring</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <User className="w-5 h-5 text-gray-600" />
            <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
