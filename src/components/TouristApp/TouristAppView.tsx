import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Shield, 
  Phone, 
  AlertTriangle, 
  Battery, 
  Signal, 
  Navigation,
  Heart,
  Camera,
  MessageCircle,
  Settings
} from 'lucide-react';

const TouristAppView: React.FC = () => {
  const [sosPressed, setSosPressed] = useState(false);

  const handleSosPress = () => {
    setSosPressed(true);
    setTimeout(() => setSosPressed(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tourist Safety App</h2>
          <p className="text-gray-600 mt-1">Your personal safety companion</p>
        </div>

        {/* Mock Phone Interface */}
        <div className="bg-black rounded-3xl p-3 shadow-2xl">
          <div className="bg-white rounded-2xl overflow-hidden h-[600px]">
            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 text-xs">
              <span className="font-medium">9:41 AM</span>
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Battery className="w-3 h-3" />
              </div>
            </div>

            {/* App Header */}
            <div className="px-4 py-3 bg-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  <span className="font-semibold">SafeTour</span>
                </div>
                <Settings className="w-5 h-5" />
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Dubai Marina - Safe Zone</span>
                </div>
              </div>
            </div>

            {/* Safety Status */}
            <div className="p-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-green-800">You are in a Safe Zone</p>
                    <p className="text-sm text-green-600">Safety Score: 94/100</p>
                  </div>
                </div>
              </div>

              {/* Emergency SOS Button */}
              <motion.button
                onClick={handleSosPress}
                whileTap={{ scale: 0.95 }}
                className={`w-full h-24 rounded-xl text-white font-bold text-lg shadow-lg transition-colors ${
                  sosPressed 
                    ? 'bg-green-600' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {sosPressed ? (
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-6 h-6" />
                    <span>Help is on the way!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    <span>EMERGENCY SOS</span>
                  </div>
                )}
              </motion.button>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-medium">Navigate</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <Phone className="w-6 h-6 text-green-600" />
                  <span className="text-xs font-medium">Call Guide</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <Camera className="w-6 h-6 text-purple-600" />
                  <span className="text-xs font-medium">Report</span>
                </button>
              </div>

              {/* Safety Tips */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Local Safety Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Stay hydrated - temperature is 35°C</li>
                  <li>• Avoid isolated areas after sunset</li>
                  <li>• Keep emergency contacts updated</li>
                </ul>
              </div>

              {/* Recent Activity */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Entered Dubai Mall</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Check-in with tour guide</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Key Features</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Real-time location tracking with privacy controls</li>
            <li>• One-touch emergency SOS with automatic context sharing</li>
            <li>• Smart safety score based on location and behavior</li>
            <li>• Multilingual support and local safety advisories</li>
            <li>• Offline mode for areas with poor connectivity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TouristAppView;
