import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Mic, Users, ArrowLeft, Loader2, Music, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Background animation component for CreateRoomPage
const CreateRoomBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sonic-blue/30 rounded-full filter blur-[100px] opacity-60 animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sonic-coral/30 rounded-full filter blur-[120px] opacity-50 animate-float-slow-reverse" />
      
      {/* Decorative elements */}
      <div className="absolute top-[15%] left-[10%] w-24 h-24 border-4 border-sonic-blue/20 rounded-lg rotate-12 animate-spin-slow" />
      <div className="absolute bottom-[20%] right-[15%] w-32 h-32 border-4 border-sonic-coral/20 rounded-full animate-float-medium" />
      
      {/* Sound wave lines - Simplified for this page */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 2) * 60}`}
              stroke={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#F97316"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.5,
                d: [
                  `M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 2) * 60}`,
                  `M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 1200 ${400 + (i - 2) * 60}`,
                  `M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 2) * 60}`,
                ]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Floating music notes - Fewer than homepage */}
      {[...Array(6)].map((_, i) => {
        const size = 20 + Math.random() * 30;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;
        const rotate = Math.random() * 30 - 15;
        
        return (
          <motion.div
            key={`note-${i}`}
            className="absolute text-sonic-blue/40 dark:text-sonic-blue/30 font-bold"
            style={{
              fontSize: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              textShadow: '0 0 5px rgba(0,0,0,0.2)'
            }}
            initial={{ opacity: 0, rotate: 0}}
            animate={{
              opacity: [0, 0.7, 0],
              y: -100,
              rotate: rotate,
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            {['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)]}
          </motion.div>
        );
      })}
      
      {/* Floating microphone icons */}
      {[...Array(3)].map((_, i) => {
        const size = 24 + Math.random() * 16;
        const initialX = 20 + Math.random() * 60; // Keep more centered
        const initialY = 20 + Math.random() * 60;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 10;
        
        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-sonic-coral/30 dark:text-sonic-coral/20"
            style={{
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-20, 20, -20],
              x: [0, Math.sin(i) * 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            {i % 3 === 0 ? <Mic size={size} /> : i % 3 === 1 ? <Music size={size} /> : <Radio size={size} />}
          </motion.div>
        );
      })}
    </div>
  );
};

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roomData, setRoomData] = useState({
    title: '',
    description: '',
    category: '',
    isPrivate: false,
    maxParticipants: 50
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRoomData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setRoomData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setRoomData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomData.title.trim()) {
      toast({
        title: "Room title required",
        description: "Please provide a title for your room",
        variant: "destructive"
      });
      return;
    }
    
    if (!roomData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your room",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create a new room ID (in a real app, this would come from the backend)
      const newRoomId = Math.floor(Math.random() * 1000) + 1;
      
      console.log('Room data:', roomData);
      
      toast({
        title: "Room created!",
        description: `Your room "${roomData.title}" has been created successfully.`,
        variant: "default"
      });
      
      // Navigate to the new room
      navigate(`/room/${newRoomId}`);
    }, 1500);
  };

  const categories = [
    "Technology", "Music", "Gaming", "Art", "Business", 
    "Education", "Science", "Health", "Sports", "Entertainment"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-muted/80 dark:from-background/90 dark:to-background/70 overflow-hidden">
      <CreateRoomBackground />
      <MainNav />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 sonic-gradient-text">Create a New Room</h1>
            <p className="text-muted-foreground">Set up your audio room and invite others to join the conversation</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-8 rounded-xl shadow-lg backdrop-blur-sm bg-background/70"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Room Title</Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="Give your room a catchy title"
                  value={roomData.title}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="What will you be talking about?"
                  value={roomData.description}
                  onChange={handleChange}
                  rows={4}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={roomData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input 
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    min={2}
                    max={100}
                    value={roomData.maxParticipants}
                    onChange={handleChange}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="isPrivate" className="block mb-2">Private Room</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="isPrivate" 
                      checked={roomData.isPrivate}
                      onCheckedChange={(checked) => handleSwitchChange('isPrivate', checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {roomData.isPrivate ? 'Invite only' : 'Anyone can join'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-sonic-blue hover:bg-sonic-blue/90 text-white btn-bounce"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Create Room
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p>By creating a room, you agree to our Community Guidelines and Terms of Service</p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateRoomPage;