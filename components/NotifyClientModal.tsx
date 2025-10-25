
import React, { useState, useEffect } from 'react';
import type { Client } from '../types';
import { CLIENTS } from '../constants';
import { generateClientNotification } from '../services/geminiService';
import { XIcon, BellIcon, UserIcon, SpinnerIcon } from './icons';

interface NotifyClientModalProps {
  areaId: string;
  onClose: () => void;
  onNotificationSent: (message: string) => void;
}

const NotifyClientModal: React.FC<NotifyClientModalProps> = ({ areaId, onClose, onNotificationSent }) => {
  const [clientsInArea, setClientsInArea] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filteredClients = CLIENTS.filter(c => c.areaId === areaId);
    setClientsInArea(filteredClients);
    if (filteredClients.length > 0) {
      setSelectedClientId(filteredClients[0].id);
    }
  }, [areaId]);

  const handleSendNotification = async () => {
    if (!selectedClientId) return;
    
    const client = clientsInArea.find(c => c.id === selectedClientId);
    if (!client) return;

    setIsLoading(true);
    const notification = await generateClientNotification(client.name, client.areaId);
    onNotificationSent(`For ${client.name}: ${notification}`);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-gray-500"/>
            Notify a Specific Client
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">Select a client in the current area to send a personalized notification.</p>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            disabled={isLoading}
          >
            {clientsInArea.length > 0 ? (
                clientsInArea.map(client => (
                    <option key={client.id} value={client.id}>
                        {client.name} - {client.address}
                    </option>
                ))
            ) : (
                <option>No clients in this area</option>
            )}
          </select>
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleSendNotification}
            disabled={isLoading || clientsInArea.length === 0}
            className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <BellIcon className="w-5 h-5 mr-2" />
                Send Notification
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyClientModal;
