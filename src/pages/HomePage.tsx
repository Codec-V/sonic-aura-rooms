
import React, { useState } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import RoomsList from '@/components/RoomsList';
import { Search, Headphones, Users, Plus, Mic, Radio, TrendingUp, Award, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { rooms } from '@/services/mockData';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted dark:from-background dark:to-background/70">
      <MainNav />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        {/* Hero Section */}
        <section className="mb-16 md:flex items-center justify-between gap-8 animate-float-up">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sonic-gradient-alt-text animate-fade-in">
              Connect through voice
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md animate-fade-in" style={{ animationDelay: "100ms" }}>
              Join immersive audio rooms, connect with others, and share ideas in real-time discussions.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Button className="bg-sonic-blue hover:bg-sonic-blue/90 text-white px-6 py-6 h-auto rounded-full btn-bounce relative overflow-hidden btn-shine">
                <Plus className="mr-2 h-5 w-5" />
                Create Room
              </Button>
              <Button variant="outline" className="border-sonic-mint text-sonic-blue hover:bg-sonic-mint/10 px-6 py-6 h-auto rounded-full btn-bounce relative overflow-hidden">
                <Users className="mr-2 h-5 w-5" />
                Browse Rooms
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden bg-sonic-blue/20">
                    <div className="w-full h-full bg-gradient-sonic rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold">5,000+</span> people joined today
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -z-10 w-full h-full bg-gradient-sonic-alt rounded-3xl blur-3xl opacity-20"></div>
              <div className="glass-card rounded-3xl overflow-hidden p-6 hover-lift">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="bg-sonic-coral/10 p-6 rounded-full">
                    <Headphones className="h-10 w-10 text-sonic-coral" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Listen Now</h3>
                    <p className="text-muted-foreground">Join rooms that interest you</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {rooms.slice(0, 2).map((room, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background card-hover">
                      <div className="bg-gradient-sonic-alt rounded-full p-2 text-white">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{room.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{room.hostName}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {room.participants.speakers + room.participants.listeners} listeners
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-sonic-mint/10 rounded-full backdrop-blur-lg animate-soft-bounce"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-sonic-coral/10 rounded-full backdrop-blur-lg animate-soft-bounce" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/3 -right-12 w-12 h-12 bg-sonic-blue/10 rounded-full backdrop-blur-lg animate-soft-bounce" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="mb-20 py-10 px-8 rounded-3xl bg-white/50 dark:bg-slate-800/20 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/30 animate-float-up" style={{ animationDelay: "100ms" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold mb-2 sonic-gradient-text">1.2M+</div>
              <p className="text-slate-600 dark:text-slate-400">Active Users</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2 warm-gradient-text">25K+</div>
              <p className="text-slate-600 dark:text-slate-400">Daily Rooms</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2 sonic-gradient-alt-text">4.5M+</div>
              <p className="text-slate-600 dark:text-slate-400">Hours Listened</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2 warm-gradient-text">150+</div>
              <p className="text-slate-600 dark:text-slate-400">Countries</p>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mb-20 animate-float-up" style={{ animationDelay: "200ms" }}>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 bg-sonic-blue/5 text-sonic-blue border-sonic-blue/20">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose WaveChat?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform is designed to provide the best audio chat experience with powerful features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:shadow-sonic-blue/5 transition-all duration-300 hover:border-sonic-mint/30">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-slate-100 dark:bg-slate-800/50">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Search and Browse Rooms */}
        <section className="mb-8 max-w-md mx-auto animate-float-up" style={{ animationDelay: "300ms" }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search rooms by title, category, or host..."
              className="pl-10 bg-background dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-12 rounded-full shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>
        
        {/* Live Rooms Section */}
        <section className="animate-float-up" style={{ animationDelay: "400ms" }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Live Rooms</h2>
            <Button variant="outline" className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10 rounded-full">
              View All
            </Button>
          </div>
          
          <RoomsList rooms={filteredRooms} />
        </section>
        
        {/* Testimonials Section */}
        <section className="my-24 animate-float-up" style={{ animationDelay: "500ms" }}>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 bg-sonic-coral/5 text-sonic-coral border-sonic-coral/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users say</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who love using WaveChat for their audio conversations.
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-slate-200 dark:border-slate-700/50 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-sonic-blue mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Award key={i} className="h-5 w-5 inline-block mr-1 text-sonic-gold" />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">"{testimonial.text}"</p>
                      <div className="mt-auto">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>
        
        {/* CTA Section */}
        <section className="my-20 text-center py-16 px-8 rounded-3xl relative overflow-hidden animate-float-up" style={{ animationDelay: "600ms" }}>
          <div className="absolute inset-0 bg-gradient-sonic opacity-10"></div>
          <div className="relative z-10">
            <div className="bg-sonic-blue/10 dark:bg-sonic-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-sonic-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to join the conversation?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
              Create your account now and start connecting with people from around the world through the power of voice.
            </p>
            <Button className="bg-sonic-blue hover:bg-sonic-blue/90 text-white px-8 py-6 h-auto rounded-full btn-bounce relative overflow-hidden btn-shine text-lg">
              Get Started Now
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-sonic-mint/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-sonic-coral/10 rounded-full"></div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
