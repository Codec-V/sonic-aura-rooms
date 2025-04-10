
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RoomProvider, useRoomContext } from '@/context/RoomContext';
import SpeakersGrid from '@/components/SpeakersGrid';
import { 
  Clock, 
  Users, 
  Mic, 
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import RoomControls from '@/components/RoomControls';
import RoomSidebar from '@/components/RoomSidebar';

const RoomStats = () => {
  const { roomData } = useRoomContext();
  
  if (!roomData) return null;
  
  return (
    <motion.div 
      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-lg font-medium mb-3">Room Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Clock className="h-5 w-5 text-slate-500" />
          <div>
            <div className="text-xs text-slate-500">Duration</div>
            <div className="font-medium">{roomData.activeTime}</div>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Users className="h-5 w-5 text-slate-500" />
          <div>
            <div className="text-xs text-slate-500">Total Participants</div>
            <div className="font-medium">{roomData.participants.speakers + roomData.participants.listeners}</div>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Mic className="h-5 w-5 text-slate-500" />
          <div>
            <div className="text-xs text-slate-500">Speakers</div>
            <div className="font-medium">{roomData.participants.speakers}</div>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Heart className="h-5 w-5 text-red-400" />
          <div>
            <div className="text-xs text-slate-500">Likes</div>
            <div className="font-medium">24</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const RecommendedRooms = () => {
  const rooms = [
    { id: '3', title: 'Digital Art Masterclass', category: 'Art', participants: 60 },
    { id: '4', title: 'Gaming Tournament Strategies', category: 'Gaming', participants: 94 }
  ];
  
  return (
    <motion.div 
      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-lg font-medium mb-3">You Might Also Like</h3>
      <div className="space-y-3">
        {rooms.map((room, i) => (
          <motion.div 
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1), type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <Card key={room.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="bg-sonic-purple/10 text-sonic-purple dark:bg-sonic-purple/20 mb-2">
                    {room.category}
                  </Badge>
                  <h4 className="font-medium">{room.title}</h4>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {room.participants}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TopMembers = () => {
  const { users } = useRoomContext();
  const hosts = users.filter(user => user.role === 'host');
  const speakers = users.filter(user => user.role === 'speaker');
  const topMembers = [...hosts, ...speakers.slice(0, 2)];
  
  return (
    <motion.div 
      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-lg font-medium mb-3">Top Contributors</h3>
      <div className="space-y-3">
        {topMembers.map((member, i) => (
          <motion.div 
            key={member.id} 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (i * 0.1), type: 'spring', stiffness: 300 }}
            whileHover={{ x: 5 }}
          >
            <div className="bg-gradient-to-br from-sonic-blue to-sonic-indigo text-white h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium">
              {member.username.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-medium">{member.username}</div>
              <div className="text-xs text-slate-500">{member.role === 'host' ? 'Host' : 'Speaker'}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RoomContent = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { roomData } = useRoomContext();
  
  useEffect(() => {
    if (!roomData) {
      toast({
        title: "Room not found",
        description: "The room you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [roomData, navigate, toast]);
  
  if (!roomData) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-sonic-dark dark:to-sonic-dark-purple pt-20 pb-24">
      <main className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="p-6 mb-6 glass-card">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-sonic-purple/10 text-sonic-purple dark:bg-sonic-purple/20 dark:text-sonic-teal">
                        {roomData.category}
                      </Badge>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {roomData.activeTime} active
                      </span>
                    </div>
                    
                    <h1 className="text-2xl font-bold sonic-gradient-text">{roomData.title}</h1>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <Mic className="h-4 w-4" />
                      <span>{roomData.participants.speakers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>{roomData.participants.listeners}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <SpeakersGrid />
          </div>
          
          <div className="space-y-6">
            <RoomStats />
            <TopMembers />
            <RecommendedRooms />
          </div>
        </motion.div>
      </main>
      
      <RoomControls />
      <RoomSidebar />
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
