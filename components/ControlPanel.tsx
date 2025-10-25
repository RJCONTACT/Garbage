
import React, { useState } from 'react';
import type { GeofenceArea } from '../types';
import NotifyClientModal from './NotifyClientModal';
import { generateAreaNotification } from '../services/geminiService';
import { BellIcon, UserIcon, SpinnerIcon } from './icons';

interface ControlPanelProps {
  currentArea: GeofenceArea | null;
  onNotificationSent: (message: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ currentArea, onNotificationSent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const handleNotifyArea = async () => {
    if (!currentArea) return;
    setIsBroadcasting(true);
    const notification = await generateAreaNotification(currentArea.name);
    onNotificationSent(`Broadcast to ${currentArea.name}: ${notification}`);
    setIsBroadcasting(false);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleNotifyArea}
          disabled={!currentArea || isBroadcasting}
          className="flex items-center justify-center w-full p-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isBroadcasting ? (
            <SpinnerIcon className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <BellIcon className="w-5 h-5 mr-2" />
          )}
          <span>Notify All in My Area</span>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!currentArea}
          className="flex items-center justify-center w-full p-4 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <UserIcon className="w-5 h-5 mr-2" />
          <span>Notify Specific Client...</span>
        </button>
      </div>
      {isModalOpen && currentArea && (
        <NotifyClientModal
          areaId={currentArea.id}
          onClose={() => setIsModalOpen(false)}
          onNotificationSent={onNotificationSent}
        />
      )}
    </>
  );
};

export default ControlPanel;
