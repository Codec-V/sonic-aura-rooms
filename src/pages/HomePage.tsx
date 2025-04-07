
import React, { useState } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import RoomsList from '@/components/RoomsList';
import { Search } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-sonic-dark dark:to-sonic-dark-purple">
      <MainNav />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <section className="mb-12 text-center animate-float-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 sonic-gradient-text">
            Welcome to SonicAura
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join live audio rooms, connect with others, and share your voice in immersive sonic experiences.
          </p>
        </section>
        
        <section className="mb-10 max-w-lg mx-auto animate-float-up" style={{ animationDelay: "100ms" }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input 
              type="text"
              placeholder="Search rooms by title, category, or host..."
              className="pl-10 bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-12 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>
        
        <section className="animate-float-up" style={{ animationDelay: "200ms" }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Live Rooms</h2>
            <Button variant="outline" className="border-sonic-teal text-sonic-teal hover:bg-sonic-teal/10">
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
