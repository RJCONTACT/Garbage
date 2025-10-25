
import type { GeofenceArea, Client } from './types';

export const GEOFENCE_AREAS: GeofenceArea[] = [
  { id: 'area1', name: 'Indiranagar', center: { lat: 30, lng: 30 }, radius: 15 },
  { id: 'area2', name: 'Koramangala', center: { lat: 70, lng: 70 }, radius: 20 },
  { id: 'area3', name: 'Jayanagar', center: { lat: 50, lng: 20 }, radius: 12 },
  { id: 'area4', name: 'Whitefield', center: { lat: 85, lng: 15 }, radius: 18 },
];

export const CLIENTS: Client[] = [
    { id: 'c1', name: 'Aarav Sharma', address: '123 Blossom St', areaId: 'area1' },
    { id: 'c2', name: 'Priya Patel', address: '456 Oak Ave', areaId: 'area1' },
    { id: 'c3', name: 'Rohan Mehta', address: '789 Pine Ln', areaId: 'area2' },
    { id: 'c4', name: 'Saanvi Gupta', address: '101 Maple Dr', areaId: 'area2' },
    { id: 'c5', name: 'Vihaan Kumar', address: '212 Birch Rd', areaId: 'area3' },
    { id: 'c6', name: 'Anika Reddy', address: '333 Cedar Ct', areaId: 'area4' },
];

export const MAP_DIMENSIONS = {
  width: 100,
  height: 100
};
