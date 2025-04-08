
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mic, MicOff, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';

export interface RoomData {
  id: string;
  title: string;
  category: string;
  participants: {
    speakers: number;
    listeners: number;
  };
  isPrivate?: boolean;
  activeTime: string;
  hostName: string;
  hostAvatar?: string;
}

interface RoomCardProps {
  room: RoomData;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <Link to={`/room/${room.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-sonic-mint/50 dark:hover:border-sonic-mint/50 hover:shadow-lg hover:shadow-sonic-blue/10 glass-card group-hover:scale-[1.02] animate-float-up p-5 rounded-2xl">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className="bg-sonic-blue/10 text-sonic-blue dark:bg-sonic-blue/20 dark:text-sonic-mint font-medium rounded-full px-3">
              {room.category}
            </Badge>
            {room.isPrivate && (
              <div className="bg-sonic-gold/10 p-1.5 rounded-full">
                <Lock className="h-4 w-4 text-sonic-gold" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:sonic-gradient-alt-text transition-all duration-300">
            {room.title}
          </h3>
          
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span className="font-medium">Hosted by {room.hostName}</span>
            <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-2"></div>
            <span>{room.activeTime}</span>
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-sonic-coral/10 dark:bg-sonic-coral/20 px-2.5 py-1 rounded-full">
                <Mic className="h-4 w-4 mr-1.5 text-sonic-coral" />
                <span className="text-sm font-medium">{room.participants.speakers}</span>
              </div>
              <div className="flex items-center bg-sonic-gold/10 dark:bg-sonic-gold/20 px-2.5 py-1 rounded-full">
                <Users className="h-4 w-4 mr-1.5 text-sonic-gold" />
                <span className="text-sm font-medium">{room.participants.listeners}</span>
              </div>
            </div>
            
            <div className="flex -space-x-3">
              {[...Array(Math.min(3, room.participants.speakers))].map((_, i) => (
                <UserAvatar
                  key={i}
                  username={String.fromCharCode(65 + i)}
                  size="sm"
                  isSpeaking={i === 0}
                  className={i === 0 ? 'z-30' : i === 1 ? 'z-20' : 'z-10'}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RoomCard;
