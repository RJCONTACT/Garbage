
import React from 'react';
import { SpinnerIcon } from './icons';

interface StatusFooterProps {
  message: string;
  isLoading: boolean;
}

const StatusFooter: React.FC<StatusFooterProps> = ({ message, isLoading }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md text-center">
        <div className="flex items-center justify-center">
            {isLoading && <SpinnerIcon className="w-5 h-5 mr-3 text-green-500 animate-spin" />}
            <p className="text-sm font-medium text-gray-700">{message}</p>
        </div>
    </div>
  );
};

export default StatusFooter;
