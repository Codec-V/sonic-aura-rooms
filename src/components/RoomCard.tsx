
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mic, MicOff, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <Card className="overflow-hidden transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-sonic-teal/50 dark:hover:border-sonic-teal/50 hover:shadow-lg hover:shadow-sonic-teal/10 glass-card group-hover:scale-[1.02] animate-float-up">
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <Badge variant="outline" className="bg-sonic-purple/10 text-sonic-purple dark:bg-sonic-purple/20 dark:text-sonic-teal">
              {room.category}
            </Badge>
            {room.isPrivate && (
              <Lock className="h-4 w-4 text-sonic-amber" />
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:sonic-gradient-text transition-all duration-300">
            {room.title}
          </h3>
          
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span>Hosted by {room.hostName}</span>
            <span className="mx-1">•</span>
            <span>{room.activeTime}</span>
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Mic className="h-4 w-4 mr-1 text-sonic-pink" />
                <span className="text-sm">{room.participants.speakers}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-sonic-amber" />
                <span className="text-sm">{room.participants.listeners}</span>
              </div>
            </div>
            
            <div className="flex -space-x-2">
              {[...Array(Math.min(3, room.participants.speakers))].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br from-sonic-purple to-sonic-pink flex items-center justify-center border-2 border-white dark:border-sonic-dark ${i === 0 ? 'active-mic' : ''}`}>
                  <span className="text-white text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RoomCard;
