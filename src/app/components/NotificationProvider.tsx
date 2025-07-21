'use client';
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  message: string;
  type?: NotificationType;
  duration?: number;
}

interface NotificationContextProps {
  notify: (message: string, type?: NotificationType, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return ctx;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const counter = useRef(0);

  const notify = useCallback((message: string, type: NotificationType = 'info', duration = 3000) => {
    const id = ++counter.current;
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-2 rounded shadow-lg text-white font-medium transition-all
              ${n.type === 'success' ? 'bg-green-600' : ''}
              ${n.type === 'error' ? 'bg-red-600' : ''}
              ${n.type === 'info' ? 'bg-blue-600' : ''}
              ${n.type === 'warning' ? 'bg-yellow-500' : ''}
            `}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}; 