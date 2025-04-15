
import React, { useState, useEffect } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import RoomsList from '@/components/RoomsList';
import { Search, Headphones, Users, Plus, Mic, Radio, TrendingUp, Award, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { rooms } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs - INCREASED OPACITY */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sonic-blue/40 rounded-full filter blur-[100px] opacity-70 animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sonic-coral/40 rounded-full filter blur-[120px] opacity-60 animate-float-slow-reverse" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-sonic-mint/40 rounded-full filter blur-[80px] opacity-50 animate-pulse-slow" />
      
      {/* Additional light theme gradient orbs - INCREASED OPACITY */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-sonic-amber/35 rounded-full filter blur-[90px] opacity-50 animate-float-medium" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-sonic-indigo/35 rounded-full filter blur-[70px] opacity-45 animate-pulse-medium" />
      
      {/* Decorative geometric shapes - INCREASED OPACITY */}
      <div className="absolute top-[15%] right-[10%] w-24 h-24 border-4 border-sonic-blue/30 rounded-lg rotate-12 animate-spin-slow" />
      <div className="absolute bottom-[20%] left-[15%] w-32 h-32 border-4 border-sonic-coral/30 rounded-full animate-float-medium" />
      <div className="absolute top-[40%] left-[5%] w-16 h-16 border-4 border-sonic-mint/30 rotate-45 animate-pulse-slow" />
      
      {/* Sound wave lines - INCREASED OPACITY */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {[...Array(10)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${400 + (i - 5) * 40} Q 300 ${400 + (i - 5) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 5) * 40} Q 900 ${400 + (i - 5) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 5) * 40}`}
              stroke={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#F97316"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.5,
                d: [
                  `M 0 ${400 + (i - 5) * 40} Q 300 ${400 + (i - 5) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 5) * 40} Q 900 ${400 + (i - 5) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 5) * 40}`,
                  `M 0 ${400 + (i - 5) * 40} Q 300 ${400 + (i - 5) * (i % 2 === 0 ? -80 : 80)} 600 ${400 + (i - 5) * 40} Q 900 ${400 + (i - 5) * (i % 2 === 0 ? 80 : -80)} 1200 ${400 + (i - 5) * 40}`,
                  `M 0 ${400 + (i - 5) * 40} Q 300 ${400 + (i - 5) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 5) * 40} Q 900 ${400 + (i - 5) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 5) * 40}`,
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
      
      {/* Light theme grid pattern - INCREASED OPACITY */}
      <div className="absolute inset-0 opacity-[0.95] dark:opacity-[0.55]">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzQjgyRjYiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjkuNSIvPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const size = 4 + Math.random() * 8;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 15 + Math.random() * 30;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white dark:bg-slate-400"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Floating bubbles */}
      {[...Array(15)].map((_, i) => {
        const size = 40 + Math.random() * 80;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100; 
        const duration = 20 + Math.random() * 40;
        const delay = Math.random() * 10;
        const colors = [
          'bg-sonic-blue/40 border-sonic-blue/50', 
          'bg-sonic-coral/30 border-sonic-coral/50', 
          'bg-sonic-mint/40 border-sonic-mint/50', 
          'bg-sonic-amber/30 border-sonic-amber/50'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`bubble-${i}`}
            className={`absolute rounded-full ${color} backdrop-blur-sm border-2`}
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              boxShadow: '0 0 15px rgba(0,0,0,0.1)'
            }}
            initial={{ opacity: 0.4 }}
            animate={{
              y: [-50, 50, -50],
              opacity: [0.4, 0.8, 0.4],
              x: [0, Math.sin(i) * 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Audio equalizer bars - Full width */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between gap-0 w-full opacity-90">
        {[...Array(100)].map((_, i) => {
          const height = 20 + Math.random() * 80;
          const duration = 1 + Math.random() * 1;
          const colors = [
            'bg-gradient-to-t from-sonic-blue/60 to-sonic-blue/90',
            'bg-gradient-to-t from-sonic-coral/60 to-sonic-coral/90',
            'bg-gradient-to-t from-sonic-mint/60 to-sonic-mint/90',
            'bg-gradient-to-t from-sonic-amber/60 to-sonic-amber/90'
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <motion.div
              key={`eq-${i}`}
              className={`w-[0.5%] rounded-t-full ${color}`}
              style={{ height: 2 }}
              animate={{
                height: [2, height, 2, height * 0.6, 2]
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      
      {/* Floating music notes */}
      {[...Array(12)].map((_, i) => {
        const size = 20 + Math.random() * 30;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;
        const rotate = Math.random() * 30 - 15;
        
        return (
          <motion.div
            key={`note-${i}`}
            className="absolute text-sonic-blue/70 dark:text-sonic-blue/70 font-bold"
            style={{
              fontSize: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              textShadow: '0 0 5px rgba(0,0,0,0.2)'
            }}
            initial={{ opacity: 0, rotate: 0}}
            animate={{
              opacity: [0, 1.8, 0],
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
      
      {/* Light theme specific decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-sonic-blue/10" />
        </svg>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  const filteredRooms = searchQuery 
    ? rooms.filter(room => 
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.hostName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : rooms;

  const features = [
    { 
      icon: <Mic className="h-10 w-10 text-sonic-blue" />, 
      title: "Crystal Clear Audio", 
      description: "Experience high-quality audio with advanced noise cancellation technology." 
    },
    { 
      icon: <Radio className="h-10 w-10 text-sonic-coral" />, 
      title: "Live Discussions", 
      description: "Join or host live conversations on topics that matter to you." 
    },
    { 
      icon: <TrendingUp className="h-10 w-10 text-sonic-mint" />, 
      title: "Discover Trending", 
      description: "Find the most popular and engaging discussions happening now." 
    },
    { 
      icon: <Users className="h-10 w-10 text-sonic-gold" />, 
      title: "Community Building", 
      description: "Connect with like-minded individuals and grow your network." 
    }
  ];

  const testimonials = [
    { name: "Sarah K.", role: "Content Creator", text: "WaveChat has completely transformed how I connect with my audience. The audio quality is exceptional!" },
    { name: "David M.", role: "Tech Enthusiast", text: "I love the seamless experience and how easy it is to find rooms that match my interests." },
    { name: "Priya T.", role: "Community Leader", text: "Building my community has never been easier. The engagement tools are game-changing." },
    { name: "James L.", role: "Podcast Host", text: "As someone who values quality conversations, WaveChat provides the perfect platform for meaningful discussions." }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-muted/80 dark:from-background/90 dark:to-background/70 overflow-hidden">
      <AnimatedBackground />
      <MainNav />
      
      <main className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        {/* Hero Section with enhanced animations */}
        <section className="mb-16 md:flex items-center justify-between gap-8">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sonic-gradient-alt-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Connect through voice
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join live audio conversations, discover interesting discussions, and connect with like-minded people in real-time.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-sonic-blue hover:bg-sonic-blue/90 text-white btn-bounce"
                onClick={() => navigate('/create-room')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Room
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10"
                onClick={() => {
                  document.getElementById('live-rooms')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <Headphones className="mr-2 h-4 w-4" />
                Explore Rooms
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-sonic-blue/20 to-sonic-coral/20 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] relative">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-4 border-white/20 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{ 
                        duration: 4,
                        delay: i * 1.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-20 h-20 bg-sonic-blue rounded-full flex items-center justify-center shadow-lg">
                      <Mic className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating user avatars */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const radius = 150;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden"
                    style={{ 
                      left: `calc(50% + ${x}px - 24px)`, 
                      top: `calc(50% + ${y}px - 24px)` 
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: [0, Math.random() * 20 - 10, 0],
                      y: [0, Math.random() * 20 - 10, 0],
                    }}
                    transition={{ 
                      delay: 0.8 + i * 0.2, 
                      duration: 0.5,
                      x: {
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      y: {
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <img 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`} 
                      alt={`User ${i+1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
        
        {/* Search Section */}
        <section className="mb-12">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for rooms, topics, or hosts..."
                className="pl-10 bg-background/50 border-slate-200 dark:border-slate-700 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </section>
        
        {/* Rooms List Section */}
        <motion.section 
          id="live-rooms"
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Live Now</h2>
            <Button variant="ghost" className="text-sonic-blue">
              View All
            </Button>
          </div>
          
          <RoomsList rooms={filteredRooms} />
        </motion.section>
        
        {/* Features Section */}
        <motion.section 
          className="mb-16 py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose WaveChat?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a unique audio experience designed to bring people together through the power of voice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              // Define gradient shadow colors based on the feature icon color
              const shadowColors = {
                'text-sonic-blue': 'rgba(59, 130, 246, 0.5) 0px 10px 30px',
                'text-sonic-coral': 'rgba(249, 115, 22, 0.5) 0px 10px 30px',
                'text-sonic-mint': 'rgba(16, 185, 129, 0.5) 0px 10px 30px',
                'text-sonic-gold': 'rgba(234, 179, 8, 0.5) 0px 10px 30px'
              };
              
              // Extract the color class from the icon
              const iconColorClass = Object.keys(shadowColors).find(
                color => feature.icon.props.className.includes(color)
              ) || 'text-sonic-blue';
              
              return (
                <motion.div 
                  key={index}
                  className="glass-card p-6 rounded-xl text-center relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: shadowColors[iconColorClass],
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Icon with hover animation */}
                  <motion.div 
                    className="mb-4 flex justify-center"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Content with subtle animations */}
                  <motion.h3 
                    className="text-xl font-semibold mb-2"
                    whileHover={{ scale: 1.05, color: "#3B82F6", transition: { duration: 0.2 } }}
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
        
        {/* Testimonials Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who are already enjoying the WaveChat experience.
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="glass-card border-none">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <p className="italic">{testimonial.text}</p>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0" />
            </div>
          </Carousel>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section 
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to join the conversation?</h2>
            <p className="text-muted-foreground mb-6">
              Create your first room or join an existing one to start connecting with others through the power of voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-sonic-blue hover:bg-sonic-blue/90 text-white btn-bounce"
                onClick={() => navigate('/create-room')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Room
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10"
                onClick={() => {
                  document.getElementById('live-rooms')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <Headphones className="mr-2 h-4 w-4" />
                Explore Rooms
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sonic-blue to-sonic-coral flex items-center justify-center mr-2">
                  <span className="text-white font-bold">SA</span>
                </div>
                <span className="font-bold text-xl sonic-gradient-text">SonicAura</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect through voice. Join live audio conversations and discover interesting discussions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sonic-blue/10 hover:text-sonic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sonic-blue/10 hover:text-sonic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sonic-blue/10 hover:text-sonic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Home</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Explore Rooms</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Create Room</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Community</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Help Center</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Community Guidelines</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Blog</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Careers</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Accessibility</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} SonicAura. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Privacy</Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Terms</Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Cookies</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
