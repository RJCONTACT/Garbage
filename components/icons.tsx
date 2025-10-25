
import React from 'react';

export const TruckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.5,12.5h-1v-2a1,1,0,0,0-1-1H16V7.5a1,1,0,0,0-1-1h- légumes.5a3,3,0,0,0-3-3H4.5a3,3,0,0,0-3,3v10a1,1,0,0,0,1,1h1.5a3,3,0,0,0,6,0h4a3,3,0,0,0,6,0h1.5a1,1,0,0,0,1-1v-2h1a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,0,21.5,12.5ZM6,18.5a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,6,18.5Zm12,0a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,18,18.5ZM18,15H3.5V7.5a1.5,1.5,0,0,1,1.5-1.5h7.5a1,1,0,0,1,1,1V15Z" />
  </svg>
);

export const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2a8,8,0,0,0-8,8c0,5.25,8,12,8,12s8-6.75,8-12A8,8,0,0,0,12,2Zm0,11.5a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,12,13.5Z" />
  </svg>
);

export const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21,19v1H3V19l2-2V11a8,8,0,0,1,16,0v6l2,2Zm-3,2a2,2,0,0,1-4,0Z" />
  </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,12A5,5,0,1,0,7,7,5,5,0,0,0,12,12Zm0,3c-3.31,0-10,1.67-10,5v2H22V20C22,16.67,15.31,15,12,15Z"/>
  </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SpinnerIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
