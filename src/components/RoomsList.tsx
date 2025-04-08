
import React from 'react';
import RoomCard, { RoomData } from './RoomCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoomsListProps {
  rooms: RoomData[];
}

const categories = [
  "All",
  "Tech",
  "Music",
  "Art",
  "Gaming",
  "Social"
];

const RoomsList = ({ rooms }: RoomsListProps) => {
  return (
    <div className="w-full animate-fade-in">
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-8 bg-muted/80 dark:bg-slate-800/50 p-1 rounded-full mx-auto flex w-fit">
          {categories.map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm px-4 py-2"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms
                .filter(room => category === "All" || room.category === category)
                .map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RoomsList;
