
import React from 'react';
import { useRoomContext } from '@/context/RoomContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Info, 
  X, 
  Send, 
  Smile, 
  Image,
  PaperclipIcon, 
  ThumbsUp, 
  Loader2,
  Mic,
  MicOff,
  Hand 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/UserAvatar';
import { ChatMessage } from './SpeakersGrid';

const RoomSidebar = () => {
  const { 
    activeSidebarPanel, 
    setActiveSidebarPanel, 
    users, 
    messages,
    sendMessage
  } = useRoomContext();
  
  const [newMessage, setNewMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeSidebarPanel === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeSidebarPanel]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setIsTyping(true);
      
      // Simulate delay for typing animation
      setTimeout(() => {
        sendMessage(newMessage);
        setNewMessage('');
        setIsTyping(false);
      }, 300);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hosts = users.filter(user => user.role === 'host');
  const speakers = users.filter(user => user.role === 'speaker');
  const listeners = users.filter(user => user.role === 'listener');

  // Animation variants
  const sidebarVariants = {
    hidden: { 
      x: '100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    visible: { 
      x: '0%', 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <AnimatePresence>
      {activeSidebarPanel && (
        <motion.div 
          className="fixed right-0 top-[72px] bottom-[76px] w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg flex flex-col border-l border-slate-200 dark:border-slate-700 z-30"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sidebarVariants}
        >
          <div className="p-4 border-b dark:border-slate-700 flex items-center justify-between">
            <motion.h3 
              className="font-medium flex items-center gap-2"
              variants={itemVariants}
            >
              {activeSidebarPanel === 'chat' && (
                <>
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Room Chat
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 dark:text-green-400">
                    Live
                  </Badge>
                </>
              )}
              {activeSidebarPanel === 'participants' && (
                <>
                  <Users className="h-4 w-4 text-primary" />
                  Participants
                  <Badge variant="outline" className="bg-sonic-mint/10 text-sonic-mint">
                    {users.length}
                  </Badge>
                </>
              )}
              {activeSidebarPanel === 'info' && (
                <>
                  <Info className="h-4 w-4 text-primary" />
                  Room Info
                </>
              )}
            </motion.h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setActiveSidebarPanel(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {activeSidebarPanel === 'chat' && (
            <div className="flex flex-col flex-grow">
              <motion.div 
                className="flex-grow overflow-auto p-4 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <AnimatePresence>
                  {messages.map(msg => (
                    <motion.div 
                      key={msg.id} 
                      className={`group flex gap-3 max-w-[85%] ${msg.isCurrentUser ? 'ml-auto' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {!msg.isCurrentUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-sonic-blue to-sonic-indigo text-white text-xs">
                            {msg.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div>
                        {!msg.isCurrentUser && (
                          <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{msg.user}</div>
                        )}
                        
                        <div className={`relative group ${
                          msg.isCurrentUser 
                            ? 'bg-primary/10 text-primary-foreground rounded-t-lg rounded-l-lg' 
                            : 'bg-slate-100 dark:bg-slate-700 rounded-t-lg rounded-r-lg'
                        } p-3`}>
                          <div className="text-sm">{msg.text}</div>
                          
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                            
                            {!msg.isCurrentUser && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ThumbsUp className="h-3 w-3" />
                                {msg.likes && <span className="ml-1 text-[10px]">{msg.likes}</span>}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>
              
              <motion.div 
                className="p-4 border-t dark:border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full transition-transform hover:scale-110"
                  >
                    <Smile className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full transition-transform hover:scale-110"
                  >
                    <Image className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full transition-transform hover:scale-110"
                  >
                    <PaperclipIcon className="h-4 w-4 text-slate-500" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-grow resize-none bg-slate-100 dark:bg-slate-700 border-none rounded-xl px-4 py-2 text-sm min-h-[40px] max-h-[120px] focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  <Button 
                    variant="default" 
                    size="icon" 
                    className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/25"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isTyping}
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
          
          {activeSidebarPanel === 'participants' && (
            <motion.div 
              className="flex-grow overflow-auto p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {hosts.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 text-sonic-gold">Hosts</h4>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {hosts.map(user => (
                        <motion.div 
                          key={user.id} 
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <div className="relative">
                            <UserAvatar
                              username={user.username}
                              avatarUrl={user.avatarUrl}
                              isMuted={user.isMuted}
                              isSpeaking={user.isSpeaking}
                              isHost={user.isHost}
                              size="sm"
                            />
                            {user.isSpeaking && (
                              <span className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800"></span>
                            )}
                          </div>
                          
                          <div>
                            <div className="font-medium text-sm">{user.username}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              {user.isMuted ? (
                                <span className="text-red-400 flex items-center">
                                  <MicOff className="h-3 w-3 mr-1" /> Muted
                                </span>
                              ) : (
                                <span className="text-green-400 flex items-center">
                                  <Mic className="h-3 w-3 mr-1" /> Speaking
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
              
              {speakers.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 text-sonic-blue">Speakers</h4>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {speakers.map(user => (
                        <motion.div 
                          key={user.id} 
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 500, delay: 0.05 * speakers.indexOf(user) }}
                        >
                          <div className="relative">
                            <UserAvatar
                              username={user.username}
                              avatarUrl={user.avatarUrl}
                              isMuted={user.isMuted}
                              isSpeaking={user.isSpeaking}
                              size="sm"
                            />
                            {user.isSpeaking && (
                              <span className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800"></span>
                            )}
                          </div>
                          
                          <div>
                            <div className="font-medium text-sm">{user.username}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              {user.isMuted ? (
                                <span className="text-red-400 flex items-center">
                                  <MicOff className="h-3 w-3 mr-1" /> Muted
                                </span>
                              ) : (
                                <span className="text-green-400 flex items-center">
                                  <Mic className="h-3 w-3 mr-1" /> Active
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
              
              {listeners.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3 text-slate-500">Listeners</h4>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {listeners.map(user => (
                        <motion.div 
                          key={user.id} 
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 500, delay: 0.05 * listeners.indexOf(user) }}
                        >
                          <div className="relative">
                            <UserAvatar
                              username={user.username}
                              avatarUrl={user.avatarUrl}
                              isMuted={user.isMuted}
                              size="sm"
                            />
                          </div>
                          
                          <div>
                            <div className="font-medium text-sm">{user.username}</div>
                            <div className="text-xs text-slate-500">Listener</div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          {activeSidebarPanel === 'info' && (
            <motion.div 
              className="flex-grow overflow-auto p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 mb-4"
              >
                <h4 className="font-medium mb-2">About this Room</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Discover the latest trends and insights in the world of blockchain and web3 technologies. 
                  Our panel of experts will discuss current developments, opportunities, and challenges in 
                  the decentralized space.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 mb-4"
              >
                <h4 className="font-medium mb-2">Room Rules</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-5">
                  <li>Be respectful to all participants</li>
                  <li>Stay on topic during discussions</li>
                  <li>Raise your hand to speak</li>
                  <li>Mute yourself when not speaking</li>
                  <li>No promotional content without permission</li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4"
              >
                <h4 className="font-medium mb-2">Scheduled Topics</h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-3">
                    <div className="text-sm font-medium">Introduction to NFTs</div>
                    <div className="text-xs text-slate-500">10:00 - 10:30 AM</div>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <div className="text-sm font-medium">DeFi Innovations</div>
                    <div className="text-xs text-slate-500">10:30 - 11:00 AM</div>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <div className="text-sm font-medium">Web3 Development</div>
                    <div className="text-xs text-slate-500">11:00 - 11:30 AM</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomSidebar;
