
import React from 'react';
import type { Coordinates, GeofenceArea } from '../types';
import { GEOFENCE_AREAS } from '../constants';
import { TruckIcon, MapPinIcon } from './icons';

interface MapViewProps {
  collectorPosition: Coordinates;
  currentArea: GeofenceArea | null;
}

const MapView: React.FC<MapViewProps> = ({ collectorPosition, currentArea }) => {
  return (
    <div className="relative w-full h-full bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden shadow-inner">
      {/* Geofence Areas */}
      {GEOFENCE_AREAS.map(area => {
        const isActive = currentArea?.id === area.id;
        return (
          <div key={area.id}>
            {/* Area Radius */}
            <div
              className={`absolute rounded-full transition-all duration-500 ${isActive ? 'bg-green-500/30 border-green-600' : 'bg-green-300/20 border-green-400'} border-2 border-dashed`}
              style={{
                left: `${area.center.lng}%`,
                top: `${area.center.lat}%`,
                width: `${area.radius * 2}%`,
                height: `${area.radius * 2}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
            {/* Area Center Pin & Label */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: `${area.center.lng}%`,
                top: `${area.center.lat}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <MapPinIcon className={`w-6 h-6 ${isActive ? 'text-green-700' : 'text-green-500'}`} />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-green-700 text-white' : 'bg-white/70 text-green-800'}`}>
                {area.name}
              </span>
            </div>
          </div>
        );
      })}
      
      {/* Collector Position */}
      <div
        className="absolute transition-all duration-1000 ease-linear"
        style={{
          left: `${collectorPosition.lng}%`,
          top: `${collectorPosition.lat}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 bg-blue-500 rounded-full animate-ping opacity-50"></span>
            <div className="p-2 bg-blue-500 rounded-full shadow-lg">
                <TruckIcon className="w-5 h-5 text-white" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
