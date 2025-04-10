import React, { createContext, useContext, useState } from 'react';
import { User, ChatMessage } from '@/components/SpeakersGrid';
import { roomUsers } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

interface RoomContextType {
  users: User[];
  currentUser: User | null;
  isHandRaised: boolean;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
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
    toast({
      title: "Left Room",
      description: "You have left the room",
    });
  };
  
  const sendMessage = (text: string) => {
    if (!currentUser) return;
    
    const newMessage: ChatMessage = {
      id: Date.now(),
      userId: currentUser.id,
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  const value = {
    users,
    currentUser,
    isHandRaised,
    messages,
    sendMessage,
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
