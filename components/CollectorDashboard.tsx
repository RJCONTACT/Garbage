
import React, { useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import MapView from './MapView';
import ControlPanel from './ControlPanel';
import StatusFooter from './StatusFooter';
import { TruckIcon } from './icons';

interface CollectorDashboardProps {
  onLogout: () => void;
}

const CollectorDashboard: React.FC<CollectorDashboardProps> = ({ onLogout }) => {
  const { position, currentArea, statusMessage, isLoading } = useLocation(true);
  const [lastNotification, setLastNotification] = useState<string>('');

  const handleNotificationSent = (message: string) => {
    setLastNotification(message);
    // Clear message after some time
    setTimeout(() => setLastNotification(''), 7000);
  };

  return (
    <div className="relative flex flex-col h-screen max-h-screen p-2 sm:p-4 bg-gray-100 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between pb-4 px-2">
            <div className="flex items-center">
                <div className="p-2 bg-green-500 rounded-lg mr-3">
                    <TruckIcon className="w-6 h-6 text-white"/>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">CleanReach Collector</h1>
                    <p className="text-xs text-gray-500">Live Route Dashboard</p>
                </div>
            </div>
            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600">
                Log Out
            </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col gap-4">
            <div className="flex-grow h-1/2">
                <MapView collectorPosition={position} currentArea={currentArea} />
            </div>
            <div className="flex-shrink-0">
                 <ControlPanel currentArea={currentArea} onNotificationSent={handleNotificationSent} />
            </div>
            <div className="flex-shrink-0">
                <StatusFooter message={statusMessage} isLoading={isLoading} />
            </div>
        </main>
        
        {/* Notification Toast */}
        {lastNotification && (
            <div className="absolute bottom-4 right-4 w-full max-w-sm p-4 bg-black text-white rounded-lg shadow-lg animate-fade-in-out">
                <p className="font-bold text-sm">Notification Sent!</p>
                <p className="text-xs mt-1">{lastNotification}</p>
            </div>
        )}
        <style>{`
            @keyframes fade-in-out {
                0%, 100% { opacity: 0; transform: translateY(20px); }
                10%, 90% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-out {
                animation: fade-in-out 7s ease-in-out;
            }
        `}</style>
    </div>
  );
};

export default CollectorDashboard;
