
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRoom, getRoomUsers } from '@/services/mockData';
import { RoomProvider, useRoomContext } from '@/context/RoomContext';
import SpeakersGrid from '@/components/SpeakersGrid';
import { ArrowLeft, Mic, MicOff, Hand, Users, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RoomControls = () => {
  const { currentUser, isHandRaised, toggleMute, raiseHand, lowerHand, leaveRoom } = useRoomContext();
  
  if (!currentUser) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-sonic-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full border-red-500 text-red-500 hover:bg-red-500/10"
          onClick={leaveRoom}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isHandRaised 
                ? 'bg-sonic-amber/20 border-sonic-amber text-sonic-amber' 
                : 'border-slate-300 dark:border-slate-700'
            }`}
            onClick={isHandRaised ? lowerHand : raiseHand}
          >
            <Hand className="h-5 w-5" />
          </Button>
          
          <Button
            variant={currentUser.isMuted ? "outline" : "default"}
            size="icon"
            className={`rounded-full ${
              !currentUser.isMuted 
                ? 'bg-sonic-teal border-sonic-teal' 
                : 'border-slate-300 dark:border-slate-700'
            }`}
            onClick={toggleMute}
          >
            {currentUser.isMuted ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-slate-300 dark:border-slate-700"
          >
            <Users className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-slate-300 dark:border-slate-700"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const RoomContent = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { users } = useRoomContext();
  
  const room = getRoom(roomId || "");
  
  useEffect(() => {
    if (!room) {
      toast({
        title: "Room not found",
        description: "The room you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [room, navigate, toast]);
  
  if (!room) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-sonic-dark dark:to-sonic-dark-purple pt-20 pb-24">
      <main className="container mx-auto px-4">
        <Card className="p-6 mb-8 glass-card animate-scale-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-sonic-purple/10 text-sonic-purple dark:bg-sonic-purple/20 dark:text-sonic-teal">
                  {room.category}
                </Badge>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {room.activeTime} active
                </span>
              </div>
              
              <h1 className="text-2xl font-bold sonic-gradient-text">{room.title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <Mic className="h-4 w-4" />
                <span>{room.participants.speakers}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <Users className="h-4 w-4" />
                <span>{room.participants.listeners}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <SpeakersGrid users={users} />
      </main>
      
      <RoomControls />
    </div>
  );
};

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  
  if (!roomId) return <div>Invalid Room ID</div>;
  
  return (
    <RoomProvider roomId={roomId}>
      <RoomContent />
    </RoomProvider>
  );
};

export default RoomPage;
