import React from 'react';
import { Users, AlertTriangle, Shield, Activity, MapPin, Radio } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentIncidents from './RecentIncidents';
import SafetyScoreChart from './SafetyScoreChart';
import { motion } from 'framer-motion';

const DashboardView: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Real-time tourist safety monitoring and incident management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Active Tourists"
          value="1,247"
          icon={Users}
          change={{ value: 12, trend: 'up' }}
          color="blue"
        />
        <StatsCard
          title="Active Incidents"
          value="3"
          icon={AlertTriangle}
          change={{ value: 25, trend: 'down' }}
          color="red"
        />
        <StatsCard
          title="Safe Zones"
          value="24"
          icon={Shield}
          color="green"
        />
        <StatsCard
          title="Avg Safety Score"
          value="87.3"
          icon={Activity}
          change={{ value: 3, trend: 'up' }}
          color="green"
        />
        <StatsCard
          title="Response Time"
          value="4.2m"
          icon={MapPin}
          change={{ value: 8, trend: 'down' }}
          color="purple"
        />
        <StatsCard
          title="Active Responders"
          value="48"
          icon={Radio}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RecentIncidents />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SafetyScoreChart />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;
