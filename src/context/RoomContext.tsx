
import React, { createContext, useContext, useState } from 'react';
import { User } from '@/components/SpeakersGrid';
import { roomUsers } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

interface RoomContextType {
  users: User[];
  currentUser: User | null;
  isHandRaised: boolean;
  toggleMute: () => void;
  raiseHand: () => void;
  lowerHand: () => void;
  leaveRoom: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

interface RoomProviderProps {
  roomId: string;
  children: React.ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ roomId, children }) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(roomUsers[roomId] || []);
  const [isHandRaised, setIsHandRaised] = useState(false);
  
  // Mock current user as the first listener for demo purposes
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const listeners = users.filter(user => user.role === 'listener');
    return listeners.length > 0 ? { ...listeners[0] } : null;
  });

  const toggleMute = () => {
    if (!currentUser) return;
    
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isMuted: !prev.isMuted
      };
    });
    
    // Update user in the users list
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === currentUser.id 
          ? { ...user, isMuted: !user.isMuted } 
          : user
      )
    );
    
    toast({
      title: currentUser.isMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: currentUser.isMuted 
        ? "You can now speak in the room" 
        : "You are now muted",
    });
  };
  
  const raiseHand = () => {
    setIsHandRaised(true);
    toast({
      title: "Hand Raised",
      description: "The host has been notified",
    });
  };
  
  const lowerHand = () => {
    setIsHandRaised(false);
  };
  
  const leaveRoom = () => {
    // This would redirect to home in a real app
    toast({
      title: "Left Room",
      description: "You have left the room",
    });
  };
  
  const value = {
    users,
    currentUser,
    isHandRaised,
    toggleMute,
    raiseHand,
    lowerHand,
    leaveRoom
  };
  
  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};
