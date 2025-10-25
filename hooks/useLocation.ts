
import { useState, useEffect, useCallback, useRef } from 'react';
import type { Coordinates, GeofenceArea } from '../types';
import { GEOFENCE_AREAS, MAP_DIMENSIONS } from '../constants';
import { generateAreaNotification } from '../services/geminiService';

const calculateDistance = (p1: Coordinates, p2: Coordinates): number => {
  return Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2));
};

export const useLocation = (isLoggedIn: boolean) => {
  const [position, setPosition] = useState<Coordinates>({ lat: 5, lng: 5 });
  const [currentArea, setCurrentArea] = useState<GeofenceArea | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('On route. Not in a designated zone.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const enteredAreasRef = useRef<Set<string>>(new Set());

  const checkGeofence = useCallback(async (currentPosition: Coordinates) => {
    let inArea = false;
    for (const area of GEOFENCE_AREAS) {
      const distance = calculateDistance(currentPosition, area.center);
      if (distance < area.radius) {
        inArea = true;
        if (!enteredAreasRef.current.has(area.id)) {
          enteredAreasRef.current.add(area.id);
          setCurrentArea(area);
          setIsLoading(true);
          setStatusMessage(`Entering Zone: ${area.name}...`);
          const notification = await generateAreaNotification(area.name);
          setStatusMessage(`Entered Zone: ${area.name} - Notifications Sent ✅`);
          console.log(`Notification for ${area.name}: ${notification}`);
          setIsLoading(false);
        } else if (currentArea?.id !== area.id) {
           setCurrentArea(area);
           setStatusMessage(`Currently in: ${area.name}`);
        }
        break; 
      }
    }

    if (!inArea) {
      if (currentArea) {
        setStatusMessage('On route. Not in a designated zone.');
        setCurrentArea(null);
        // Reset entered areas if you want re-notification on re-entry later in the session.
        // For this app, we'll keep them marked as entered for the session.
      }
    }
  }, [currentArea]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const moveCollector = () => {
      setPosition(prev => {
        let newLat = prev.lat + 0.5;
        let newLng = prev.lng + 0.5;
        if(newLat > MAP_DIMENSIONS.height) newLat = 5;
        if(newLng > MAP_DIMENSIONS.width) newLng = 5;
        const newPosition = { lat: newLat, lng: newLng };
        checkGeofence(newPosition);
        return newPosition;
      });
    };

    const intervalId = setInterval(moveCollector, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, checkGeofence]);

  return { position, currentArea, statusMessage, isLoading };
};
