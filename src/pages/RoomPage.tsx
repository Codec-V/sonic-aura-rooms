import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRoom, getRoomUsers } from '@/services/mockData';
import { RoomProvider, useRoomContext } from '@/context/RoomContext';
import SpeakersGrid from '@/components/SpeakersGrid';
import { 
  ArrowLeft, Mic, MicOff, Hand, Users, Share2, MessageSquare, Clock, 
  Info, ChevronDown, ChevronUp, Heart, ChevronRight, Send, Smile, 
  Image, PaperclipIcon, ThumbsUp, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

// Enhanced chat message type for more features
type ChatMessage = {
  id: number;
  user: string;
  text: string;
  avatar?: string;
  timestamp: string;
  likes?: number;
  isCurrentUser?: boolean;
};

const ChatSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
  
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (message.trim()) {
      setIsTyping(true);
      
      // Simulate delay for typing animation
      setTimeout(() => {
        const newMessage: ChatMessage = {
          id: messages.length + 1,
          user: 'You',
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
      
      toast({
        title: "New Message",
        description: `${newReply.user}: ${newReply.text}`,
      });
    }, 3000);
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
  
  return (
    <div className="fixed right-0 bottom-24 top-20 w-full md:w-80 transform transition-transform duration-300 ease-in-out z-30"
         style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 bg-white dark:bg-slate-800 shadow-md rounded-l-lg">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className={`h-20 w-10 rounded-l-lg rounded-r-none transition-all duration-300 ${isOpen ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
        >
          {isOpen ? (
            <ChevronRight className="h-5 w-5 animate-pulse" />
          ) : (
            <div className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                {messages.length}
              </span>
            </div>
          )}
        </Button>
      </div>
      
      <div className="h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg flex flex-col">
        <div className="p-4 border-b dark:border-slate-700">
          <h3 className="font-medium flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-primary" />
            Room Chat
            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400">
              Live
            </Badge>
          </h3>
        </div>
        
        <div className="flex-grow overflow-auto p-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`group flex gap-3 max-w-[85%] animate-fade-in ${msg.isCurrentUser ? 'ml-auto' : ''}`}
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
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Typing...</span>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t dark:border-slate-700">
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

const RoomStats = ({ room }) => {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-3">Room Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-slate-500" />
          <div>
            <div className="text-xs text-slate-500">Duration</div>
            <div className="font-medium">{room.activeTime}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-500" />
          <div>
            <div className="text-xs text-slate-500">Total Participants</div>
            <div className="font-medium">{room.participants.speakers + room.participants.listeners}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-slate-500" />
          <div>
            <div className="text-xs text-slate-500">Speakers</div>
            <div className="font-medium">{room.participants.speakers}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          <div>
            <div className="text-xs text-slate-500">Likes</div>
            <div className="font-medium">24</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendedRooms = () => {
  const rooms = [
    { id: '2', title: 'Lo-fi Beats & Chill Vibes', category: 'Music', participants: 130 },
    { id: '3', title: 'Digital Art Masterclass', category: 'Art', participants: 60 }
  ];
  
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm mt-6">
      <h3 className="text-lg font-medium mb-3">You Might Also Like</h3>
      <div className="space-y-3">
        {rooms.map(room => (
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
        ))}
      </div>
    </div>
  );
};

const TopMembers = () => {
  const members = [
    { id: 1, name: 'Alex Turner', role: 'Host', avatar: null },
    { id: 2, name: 'Maya Johnson', role: 'Speaker', avatar: null },
    { id: 3, name: 'Ethan Zhang', role: 'Speaker', avatar: null }
  ];
  
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm mt-6">
      <h3 className="text-lg font-medium mb-3">Top Contributors</h3>
      <div className="space-y-3">
        {members.map(member => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-sonic-blue to-sonic-indigo text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-xs text-slate-500">{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoomInfoAccordion = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="my-4">
      <div 
        className="flex items-center justify-between bg-white/70 dark:bg-slate-800/70 p-3 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-slate-500" />
          <h3 className="font-medium">Room Information</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-b-lg mt-1 animate-accordion-down">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Discover the latest trends and insights in the world of blockchain and web3 technologies. 
            Our panel of experts will discuss current developments, opportunities, and challenges in 
            the decentralized space.
          </p>
          <div className="text-sm text-slate-500">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              <span>Started {room.activeTime} ago</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{room.participants.speakers + room.participants.listeners} participants</span>
            </div>
          </div>
        </div>
      )}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6 glass-card animate-scale-in">
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
            
            <RoomInfoAccordion room={room} />
            
            <SpeakersGrid users={users} />
          </div>
          
          <div className="space-y-6">
            <RoomStats room={room} />
            <TopMembers />
            <RecommendedRooms />
          </div>
        </div>
      </main>
      
      <RoomControls />
      <ChatSection />
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
