import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'mention' | 'invite' | 'announcement' | 'activity';
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Sample notifications data
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Room Invitation',
    message: 'You have been invited to join "AI in Creative Industries" room',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    type: 'invite'
  },
  {
    id: '2',
    title: 'Mention in Discussion',
    message: 'Alex mentioned you in "Web3 & Blockchain" room',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: 'mention'
  },
  {
    id: '3',
    title: 'Room Starting Soon',
    message: 'The "Gaming Tournament Strategies" room is starting in 15 minutes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
    type: 'announcement'
  },
  {
    id: '4',
    title: 'New Follower',
    message: 'Maya Johnson started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: 'activity'
  },
  {
    id: '5',
    title: 'Room Recommendation',
    message: 'Based on your interests: "Digital Art Masterclass" is live now',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    read: true,
    type: 'announcement'
  }
];

// Add some sample notifications for testing
const sampleNotifications = [
  {
    id: '1',
    title: 'New room created',
    message: 'Audio Explorers room is now live',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: '2',
    title: 'Friend request',
    message: 'Sarah Williams wants to connect',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false
  },
  {
    id: '3',
    title: 'Room invitation',
    message: 'You\'ve been invited to join "Music Production Tips"',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true
  }
];

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  // Change this line to use the initialNotifications
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  return (
    <NotificationsContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      clearNotification 
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};