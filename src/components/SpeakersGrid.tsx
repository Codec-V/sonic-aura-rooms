
import React, { useState, useRef, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import { Badge } from '@/components/ui/badge';
import { Send, Smile, PaperclipIcon, Image, ThumbsUp, Loader2, MessageSquare, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRoomContext } from '@/context/RoomContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useRoomContext();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      user: 'Maya Johnson', 
      text: 'Has anyone tried the new audio processing software?', 
      timestamp: '10:32 AM',
      likes: 2
    },
    { 
      id: 2, 
      user: 'Alex Turner', 
      text: "Yes, I've been testing it for a few days. The noise cancellation is impressive!", 
      timestamp: '10:35 AM',
      likes: 3
    },
    { 
      id: 3, 
      user: 'Ethan Zhang', 
      text: "I'd love to hear more about your experience with it.", 
      timestamp: '10:38 AM' 
    },
    { 
      id: 4, 
      user: 'Sarah Miller', 
      text: "I'm planning to use it for our next podcast episode. Any tips for optimal settings?", 
      timestamp: '10:45 AM' 
    }
  ]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      setIsTyping(true);
      
      // Simulate delay for typing animation
      setTimeout(() => {
        const newMessage: ChatMessage = {
          id: messages.length + 1,
          user: currentUser?.username || 'You',
          text: message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: true
        };
        
        setMessages([...messages, newMessage]);
        setMessage('');
        setIsTyping(false);
        
        // Simulate an automatic response after a brief delay
        simulateReply();
      }, 500);
    }
  };
  
  const simulateReply = () => {
    const responses = [
      "That's a great point!",
      "I agree with what you're saying.",
      "Interesting perspective, thanks for sharing.",
      "Has anyone else experienced this?",
      "I'd like to add to that discussion point."
    ];
    
    const users = ["Maya Johnson", "Alex Turner", "Ethan Zhang", "Sarah Miller"];
    
    setTimeout(() => {
      const newReply: ChatMessage = {
        id: messages.length + 2,
        user: users[Math.floor(Math.random() * users.length)],
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, newReply]);
    }, 2000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleLikeMessage = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg
    ));
  };

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
  
  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <div className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-sonic-blue" />
            <h2 className="text-lg font-semibold">Room Chat</h2>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 dark:text-green-400">
            Live
          </Badge>
        </div>
        
        <motion.div 
          className="h-[400px] overflow-y-auto mb-4 p-2 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div 
                key={msg.id} 
                className={`group flex gap-3 max-w-[85%] ${msg.isCurrentUser ? 'ml-auto' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
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
                          onClick={() => handleLikeMessage(msg.id)}
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
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Smile className="h-4 w-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Image className="h-4 w-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <PaperclipIcon className="h-4 w-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-auto">
              <RefreshCw className="h-4 w-4 text-slate-500" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-grow resize-none bg-slate-100 dark:bg-slate-700 border-none rounded-xl px-4 py-2 text-sm min-h-[40px] max-h-[120px] focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button 
              variant="default" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 transition-colors"
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakersGrid;
