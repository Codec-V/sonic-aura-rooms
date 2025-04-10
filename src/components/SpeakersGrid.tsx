
import React, { useState } from 'react';
import UserAvatar from './UserAvatar';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Mic, Users, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isHost: boolean;
  role: 'host' | 'speaker' | 'listener';
}

interface SpeakersGridProps {
  users: User[];
}

const SpeakersGrid = ({ users }: SpeakersGridProps) => {
  // Filter hosts and speakers
  const hosts = users.filter(user => user.role === 'host');
  const speakers = users.filter(user => user.role === 'speaker');
  const listeners = users.filter(user => user.role === 'listener');
  
  const [showAllListeners, setShowAllListeners] = useState(false);
  
  // Display limited listeners initially
  const displayedListeners = showAllListeners ? listeners : listeners.slice(0, 6);
  
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {/* Stats row */}
      <div className="w-full grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="bg-sonic-gold/20 p-2 rounded-full">
            <Crown className="h-5 w-5 text-sonic-gold" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Hosts</div>
            <div className="text-xl font-bold">{hosts.length}</div>
          </div>
        </div>
        
        <div className="bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="bg-sonic-blue/20 p-2 rounded-full">
            <Mic className="h-5 w-5 text-sonic-blue" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Speakers</div>
            <div className="text-xl font-bold">{speakers.length}</div>
          </div>
        </div>
        
        <div className="bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl shadow-sm flex items-center space-x-3">
          <div className="bg-sonic-coral/20 p-2 rounded-full">
            <Users className="h-5 w-5 text-sonic-coral" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Listeners</div>
            <div className="text-xl font-bold">{listeners.length}</div>
          </div>
        </div>
      </div>
      
      {/* Hosts section with animated badges */}
      <div className="relative w-full">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sonic-gold/20 px-3 py-1 rounded-full">
          <Badge variant="outline" className="bg-sonic-gold/20 border-sonic-gold text-sonic-gold animate-pulse">
            Hosts
          </Badge>
        </div>
        <motion.div 
          className="flex flex-wrap justify-center gap-8 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm p-6 pt-8 rounded-xl shadow-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {hosts.map(user => (
            <motion.div key={user.id} variants={itemVariants}>
              <UserAvatar
                username={user.username}
                avatarUrl={user.avatarUrl}
                isMuted={user.isMuted}
                isSpeaking={user.isSpeaking}
                isHost={true}
                size="lg"
                className="hover:-translate-y-2 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Speakers section */}
      {speakers.length > 0 && (
        <div className="relative w-full">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sonic-blue/20 px-3 py-1 rounded-full">
            <Badge variant="outline" className="bg-sonic-blue/20 border-sonic-blue text-sonic-blue">
              Speakers
            </Badge>
          </div>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 max-w-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm p-6 pt-8 rounded-xl shadow-sm mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {speakers.map(user => (
              <motion.div key={user.id} variants={itemVariants}>
                <UserAvatar
                  username={user.username}
                  avatarUrl={user.avatarUrl}
                  isMuted={user.isMuted}
                  isSpeaking={user.isSpeaking}
                  size="md"
                  className="hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
      
      {/* Listeners section */}
      {listeners.length > 0 && (
        <div className="relative w-full">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sonic-coral/20 px-3 py-1 rounded-full">
            <Badge variant="outline" className="bg-sonic-coral/20 border-sonic-coral text-sonic-coral">
              Listeners ({listeners.length})
            </Badge>
          </div>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 max-w-4xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm p-6 pt-8 rounded-xl shadow-sm mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedListeners.map(user => (
              <motion.div key={user.id} variants={itemVariants}>
                <UserAvatar
                  username={user.username}
                  avatarUrl={user.avatarUrl}
                  isMuted={true}
                  size="sm"
                  className="hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            ))}
            
            {listeners.length > 6 && !showAllListeners && (
              <motion.div 
                className="flex items-center justify-center cursor-pointer"
                onClick={() => setShowAllListeners(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 rounded-full bg-sonic-blue/20 flex items-center justify-center">
                  <PlusCircle className="h-5 w-5 text-sonic-blue" />
                </div>
                <span className="ml-2 text-xs text-sonic-blue font-medium">
                  +{listeners.length - 6} more
                </span>
              </motion.div>
            )}
            
            {showAllListeners && (
              <motion.button
                className="mt-4 text-sm text-sonic-blue hover:text-sonic-blue/80 transition-colors"
                onClick={() => setShowAllListeners(false)}
                variants={itemVariants}
              >
                Show less
              </motion.button>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SpeakersGrid;
