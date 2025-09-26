export interface Tourist {
  id: string;
  name: string;
  digitalId: string;
  nationality: string;
  location: {
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: number;
  };
  safetyScore: number;
  status: 'safe' | 'warning' | 'critical' | 'offline';
  lastActivity: number;
  currentZone: string;
  emergencyContacts: Array<{
    name: string;
    phone: string;
    relationship: string;
  }>;
  deviceInfo: {
    batteryLevel: number;
    connectivity: 'online' | 'offline' | 'low_signal';
  };
}

export interface Incident {
  id: string;
  touristId: string;
  touristName: string;
  type: 'anomaly_detection' | 'geofence_breach' | 'panic_button' | 'prolonged_inactivity' | 'sensor_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'responding' | 'resolved' | 'false_alarm';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  timestamp: number;
  assignedResponder?: string;
  aiConfidence: number;
  escalationLevel: number;
  responseTime?: number;
  resolution?: string;
}

export interface GeofenceZone {
  id: string;
  name: string;
  type: 'safe_zone' | 'restricted' | 'emergency' | 'tourist_area';
  coordinates: Array<{lat: number; lng: number}>;
  rules: {
    allowEntry: boolean;
    requiresPermission: boolean;
    alertOnEntry: boolean;
    alertOnExit: boolean;
  };
  severity: 'info' | 'warning' | 'critical';
  description: string;
  isActive: boolean;
}

export interface ResponderUnit {
  id: string;
  name: string;
  type: 'police' | 'medical' | 'tour_guide' | 'embassy' | 'rescue';
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'responding' | 'busy' | 'offline';
  assignedIncidents: string[];
  contactInfo: {
    phone: string;
    radio: string;
  };
  estimatedArrival?: number;
}

export interface DigitalIdentity {
  id: string;
  touristId: string;
  blockchainHash: string;
  verificationLevel: 'basic' | 'verified' | 'government_issued';
  documents: Array<{
    type: 'passport' | 'visa' | 'vaccination' | 'insurance' | 'emergency_contact';
    hash: string;
    issuer: string;
    expiryDate?: number;
    verificationStatus: 'pending' | 'verified' | 'expired' | 'invalid';
  }>;
  biometricHash?: string;
  consentRecords: Array<{
    feature: string;
    granted: boolean;
    timestamp: number;
    scope: string[];
  }>;
}
