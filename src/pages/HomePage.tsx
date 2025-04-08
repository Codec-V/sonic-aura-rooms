
import React, { useState } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import RoomsList from '@/components/RoomsList';
import { Search, Headphones, Users, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { rooms } from '@/services/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRooms = searchQuery 
    ? rooms.filter(room => 
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.hostName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : rooms;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted dark:from-background dark:to-background/70">
      <MainNav />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <section className="mb-16 md:flex items-center justify-between gap-8 animate-float-up">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sonic-gradient-alt-text">
              Connect through voice
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md">
              Join immersive audio rooms, connect with others, and share ideas in real-time discussions.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-sonic-blue hover:bg-sonic-blue/90 text-white px-6 py-6 h-auto rounded-full btn-bounce">
                <Plus className="mr-2 h-5 w-5" />
                Create Room
              </Button>
              <Button variant="outline" className="border-sonic-mint text-sonic-blue hover:bg-sonic-mint/10 px-6 py-6 h-auto rounded-full btn-bounce">
                <Users className="mr-2 h-5 w-5" />
                Browse Rooms
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -z-10 w-full h-full bg-gradient-sonic-alt rounded-3xl blur-3xl opacity-20"></div>
              <div className="glass-card rounded-3xl overflow-hidden p-6">
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
          </div>
        </section>
        
        <section className="mb-8 max-w-md mx-auto animate-float-up" style={{ animationDelay: "100ms" }}>
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
        
        <section className="animate-float-up" style={{ animationDelay: "200ms" }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Live Rooms</h2>
            <Button variant="outline" className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10 rounded-full">
              View All
            </Button>
          </div>
          
          <RoomsList rooms={filteredRooms} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
