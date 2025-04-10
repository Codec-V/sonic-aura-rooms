
import { RoomData } from "@/components/RoomCard";
import { User } from "@/components/SpeakersGrid";

export const rooms: RoomData[] = [
  {
    id: "1",
    title: "Future of AI in Creative Industries",
    category: "Tech",
    participants: {
      speakers: 3,
      listeners: 42
    },
    activeTime: "2h 15m",
    hostName: "Alex Turner",
  },
  {
    id: "2",
    title: "Lo-fi Beats & Chill Vibes",
    category: "Music",
    participants: {
      speakers: 2,
      listeners: 128
    },
    activeTime: "4h 30m",
    hostName: "Melody Waves",
  },
  {
    id: "3",
    title: "Digital Art Masterclass: NFTs & Beyond",
    category: "Art",
    participants: {
      speakers: 4,
      listeners: 56
    },
    activeTime: "1h 45m",
    hostName: "Pixel Master",
  },
  {
    id: "4",
    title: "Gaming Tournament Strategies",
    category: "Gaming",
    participants: {
      speakers: 5,
      listeners: 89
    },
    activeTime: "3h 10m",
    hostName: "Pro Gamer",
  },
  {
    id: "5",
    title: "Startup Networking Hour",
    category: "Social",
    participants: {
      speakers: 6,
      listeners: 73
    },
    isPrivate: true,
    activeTime: "1h 05m",
    hostName: "Tech Founder",
  },
  {
    id: "6",
    title: "Web3 & Blockchain Discussion",
    category: "Tech",
    participants: {
      speakers: 4,
      listeners: 62
    },
    activeTime: "2h 40m",
    hostName: "Crypto Enthusiast",
  },
];

export const roomUsers: Record<string, User[]> = {
  "1": [
    {
      id: "host1",
      username: "Alex Turner",
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      role: "host"
    },
    {
      id: "speaker1",
      username: "Maya Johnson",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker2",
      username: "Ethan Zhang",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "listener1",
      username: "Sofia Garcia",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener2",
      username: "James Wilson",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener3",
      username: "Olivia Taylor",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener4",
      username: "Noah Davis",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener5",
      username: "Emma Rodriguez",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener6",
      username: "Liam Thompson",
      isMuted: true,
      isSpeaking: false,
      isHost: false, 
      role: "listener"
    },
    {
      id: "listener7",
      username: "Ava Martin",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener8",
      username: "William Chen",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    }
  ],
  "2": [
    {
      id: "host2",
      username: "Melody Waves",
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      role: "host"
    },
    {
      id: "speaker21",
      username: "Jazz Master",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "listener21",
      username: "Rhythm King",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener22",
      username: "Beats Queen",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener23",
      username: "Sound Explorer",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    }
  ]
};

export const getRoom = (id: string): RoomData | undefined => {
  return rooms.find(room => room.id === id);
};

export const getRoomUsers = (id: string): User[] => {
  return roomUsers[id] || [];
};
