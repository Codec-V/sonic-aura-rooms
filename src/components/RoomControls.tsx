
import React from 'react';
import { useRoomContext } from '@/context/RoomContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Hand, 
  Users, 
  Share2, 
  MessageSquare, 
  Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RoomControls = () => {
  const { 
    currentUser, 
    isHandRaised, 
    toggleMute, 
    raiseHand, 
    lowerHand, 
    leaveRoom,
    activeSidebarPanel,
    setActiveSidebarPanel
  } = useRoomContext();
  
  const navigate = useNavigate();
  
  if (!currentUser) return null;
  
  const handleLeaveRoom = () => {
    leaveRoom();
    navigate('/');
  };
  
  const toggleSidebarPanel = (panel: 'chat' | 'participants' | 'info') => {
    setActiveSidebarPanel(activeSidebarPanel === panel ? null : panel);
  };
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
            onClick={handleLeaveRoom}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={isHandRaised ? "raised" : "lowered"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full transition-colors ${
                  isHandRaised 
                    ? 'bg-sonic-amber/20 border-sonic-amber text-sonic-amber' 
                    : 'border-slate-300 dark:border-slate-700'
                }`}
                onClick={isHandRaised ? lowerHand : raiseHand}
              >
                <Hand className="h-5 w-5" />
              </Button>
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUser.isMuted ? "muted" : "unmuted"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={currentUser.isMuted ? "outline" : "default"}
                size="icon"
                className={`rounded-full transition-colors ${
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
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={activeSidebarPanel === 'participants' ? 'default' : 'outline'}
              size="icon"
              className="rounded-full border-slate-300 dark:border-slate-700 transition-colors"
              onClick={() => toggleSidebarPanel('participants')}
            >
              <Users className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={activeSidebarPanel === 'chat' ? 'default' : 'outline'}
              size="icon"
              className="rounded-full border-slate-300 dark:border-slate-700 transition-colors"
              onClick={() => toggleSidebarPanel('chat')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={activeSidebarPanel === 'info' ? 'default' : 'outline'}
              size="icon"
              className="rounded-full border-slate-300 dark:border-slate-700 transition-colors"
              onClick={() => toggleSidebarPanel('info')}
            >
              <Info className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-300 dark:border-slate-700 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomControls;
