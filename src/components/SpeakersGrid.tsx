
import React, { useState, useRef, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import { Badge } from '@/components/ui/badge';
import { useRoomContext } from '@/context/RoomContext';
import { motion, AnimatePresence } from 'framer-motion';

// Export the User interface for other components to use
export interface User {
  id: string;
  username: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isHost: boolean;
  role: 'host' | 'speaker' | 'listener';
  avatarUrl?: string;
}

// Enhanced chat message type for more features
export interface ChatMessage {
  id: number;
  user: string;
  text: string;
  avatar?: string;
  timestamp: string;
  likes?: number;
  isCurrentUser?: boolean;
}

const SpeakersGrid = () => {
  const { users } = useRoomContext();
  
  // Filter users by role
  const hosts = users.filter(user => user.role === 'host');
  const speakers = users.filter(user => user.role === 'speaker');
  const activeParticipants = [...hosts, ...speakers];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };
  
  return (
    <div className="w-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Active Speakers</h2>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 dark:text-green-400">
          {activeParticipants.length} Active
        </Badge>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {activeParticipants.map(user => (
            <motion.div 
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white/50 dark:bg-slate-700/50 rounded-xl p-4 flex flex-col items-center transition-all"
            >
              <div className="relative mb-3">
                <UserAvatar
                  username={user.username}
                  avatarUrl={user.avatarUrl}
                  isMuted={user.isMuted}
                  isSpeaking={user.isSpeaking}
                  isHost={user.isHost}
                  size="lg"
                />
                
                {user.isSpeaking && (
                  <motion.div
                    className="absolute -inset-2 rounded-full bg-green-500/20 z-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                )}
                
                {user.isHost && (
                  <div className="absolute -bottom-1 -right-1 bg-sonic-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Host
                  </div>
                )}
              </div>
              
              <h3 className="font-medium text-center">{user.username}</h3>
              
              <div className="mt-2 flex items-center justify-center">
                <Badge 
                  variant="outline" 
                  className={user.isMuted ? 
                    "bg-red-500/10 text-red-500" : 
                    "bg-green-500/10 text-green-500"}
                >
                  {user.isMuted ? "Muted" : "Speaking"}
                </Badge>
              </div>
              
              {user.isSpeaking && !user.isMuted && (
                <motion.div 
                  className="mt-3 w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-sonic-blue to-sonic-teal"
                    animate={{
                      width: ["30%", "80%", "50%", "70%", "40%"]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SpeakersGrid;
