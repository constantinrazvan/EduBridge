'use client';

import { useEffect } from 'react';
import { registerServiceWorker, requestNotificationPermission } from '@/utils/serviceWorker';

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Register service worker
    registerServiceWorker();
    
    // Request notification permission
    requestNotificationPermission();
    
    // Handle online/offline events
    const handleOnline = () => {
      console.log('App is online');
      // You can add toast notification here
    };
    
    const handleOffline = () => {
      console.log('App is offline');
      // You can add toast notification here
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return <>{children}</>;
};
