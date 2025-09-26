import { faker } from '@faker-js/faker';
import { Tourist, Incident, GeofenceZone, ResponderUnit, DigitalIdentity } from '../types';

export const generateMockTourists = (count: number): Tourist[] => {
  return Array.from({ length: count }, () => {
    const lat = faker.location.latitude({ min: 25.1972, max: 25.2761 });
    const lng = faker.location.longitude({ min: 55.2699, max: 55.3094 });
    const safetyScore = faker.number.int({ min: 65, max: 100 });
    
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      digitalId: `DID:${faker.string.alphanumeric(12).toUpperCase()}`,
      nationality: faker.location.country(),
      location: {
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6)),
        accuracy: faker.number.int({ min: 3, max: 15 }),
        timestamp: Date.now() - faker.number.int({ min: 0, max: 300000 })
      },
      safetyScore: safetyScore,
      status: safetyScore > 85 ? 'safe' : safetyScore > 70 ? 'warning' : safetyScore > 50 ? 'critical' : 'offline',
      lastActivity: Date.now() - faker.number.int({ min: 60000, max: 1800000 }),
      currentZone: faker.helpers.arrayElement(['Downtown Dubai', 'Dubai Marina', 'JBR Beach', 'Dubai Mall Area', 'Burj Khalifa District']),
      emergencyContacts: [
        {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          relationship: faker.helpers.arrayElement(['spouse', 'parent', 'sibling', 'friend'])
        }
      ],
      deviceInfo: {
        batteryLevel: faker.number.int({ min: 15, max: 100 }),
        connectivity: faker.helpers.arrayElement(['online', 'offline', 'low_signal'])
      }
    };
  });
};

export const generateMockIncidents = (count: number): Incident[] => {
  return Array.from({ length: count }, () => {
    const severity = faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']);
    const lat = faker.location.latitude({ min: 25.1972, max: 25.2761 });
    const lng = faker.location.longitude({ min: 55.2699, max: 55.3094 });
    
    return {
      id: faker.string.uuid(),
      touristId: faker.string.uuid(),
      touristName: faker.person.fullName(),
      type: faker.helpers.arrayElement(['anomaly_detection', 'geofence_breach', 'panic_button', 'prolonged_inactivity', 'sensor_alert']),
      severity,
      status: faker.helpers.arrayElement(['active', 'responding', 'resolved', 'false_alarm']),
      location: {
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6)),
        address: faker.location.streetAddress()
      },
      description: faker.lorem.sentence(),
      timestamp: Date.now() - faker.number.int({ min: 0, max: 86400000 }),
      assignedResponder: faker.person.fullName(),
      aiConfidence: faker.number.float({ min: 0.65, max: 0.98, fractionDigits: 2 }),
      escalationLevel: severity === 'critical' ? 3 : severity === 'high' ? 2 : 1,
      responseTime: faker.number.int({ min: 2, max: 45 })
    };
  });
};

export const generateMockGeofences = (): GeofenceZone[] => {
  return [
    {
      id: '1',
      name: 'Dubai Marina Safe Zone',
      type: 'safe_zone',
      coordinates: [
        { lat: 25.0776, lng: 55.1391 },
        { lat: 25.0876, lng: 55.1391 },
        { lat: 25.0876, lng: 55.1491 },
        { lat: 25.0776, lng: 55.1491 }
      ],
      rules: {
        allowEntry: true,
        requiresPermission: false,
        alertOnEntry: false,
        alertOnExit: true
      },
      severity: 'info',
      description: 'Main tourist area with high security',
      isActive: true
    },
    {
      id: '2',
      name: 'Restricted Industrial Area',
      type: 'restricted',
      coordinates: [
        { lat: 25.1200, lng: 55.1800 },
        { lat: 25.1300, lng: 55.1800 },
        { lat: 25.1300, lng: 55.1900 },
        { lat: 25.1200, lng: 55.1900 }
      ],
      rules: {
        allowEntry: false,
        requiresPermission: true,
        alertOnEntry: true,
        alertOnExit: false
      },
      severity: 'critical',
      description: 'Industrial zone - entry prohibited for tourists',
      isActive: true
    }
  ];
};

export const generateMockResponders = (count: number): ResponderUnit[] => {
  return Array.from({ length: count }, () => {
    const lat = faker.location.latitude({ min: 25.1972, max: 25.2761 });
    const lng = faker.location.longitude({ min: 55.2699, max: 55.3094 });
    
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      type: faker.helpers.arrayElement(['police', 'medical', 'tour_guide', 'embassy', 'rescue']),
      location: {
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6))
      },
      status: faker.helpers.arrayElement(['available', 'responding', 'busy', 'offline']),
      assignedIncidents: [],
      contactInfo: {
        phone: faker.phone.number(),
        radio: `RADIO-${faker.string.alphanumeric(6).toUpperCase()}`
      },
      estimatedArrival: faker.number.int({ min: 5, max: 30 })
    };
  });
};
