
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
  ],
  "3": [
    {
      id: "host3",
      username: "Pixel Master",
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      role: "host"
    },
    {
      id: "speaker31",
      username: "Art Guru",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker32",
      username: "Digital Artist",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker33",
      username: "NFT Expert",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "listener31",
      username: "Creative Soul",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener32",
      username: "Design Enthusiast",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener33",
      username: "Canvas Dreamer",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener34",
      username: "Color Master",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener35",
      username: "Sketch Pro",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    }
  ],
  "4": [
    {
      id: "host4",
      username: "Pro Gamer",
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      role: "host"
    },
    {
      id: "speaker41",
      username: "Strategy Master",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker42",
      username: "Speed Runner",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker43",
      username: "Team Captain",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker44",
      username: "ESports Legend",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "listener41",
      username: "Casual Gamer",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener42",
      username: "Twitch Streamer",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    }
  ],
  "5": [
    {
      id: "host5",
      username: "Tech Founder",
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      role: "host"
    },
    {
      id: "speaker51",
      username: "Startup Mentor",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker52",
      username: "VC Partner",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker53",
      username: "Product Lead",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker54",
      username: "Growth Hacker",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker55",
      username: "Angel Investor",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "listener51",
      username: "Aspiring Founder",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    }
  ],
  "6": [
    {
      id: "host6",
      username: "Crypto Enthusiast",
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      role: "host"
    },
    {
      id: "speaker61",
      username: "Blockchain Dev",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker62",
      username: "DeFi Expert",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "speaker63",
      username: "NFT Collector",
      isMuted: false,
      isSpeaking: false,
      isHost: false,
      role: "speaker"
    },
    {
      id: "listener61",
      username: "Crypto Trader",
      isMuted: true,
      isSpeaking: false,
      isHost: false,
      role: "listener"
    },
    {
      id: "listener62",
      username: "Web3 Developer",
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

// Add chat message type
export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number; // Unix timestamp
}

// Add mock chat messages for each room
export const roomChats: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "msg1-1",
      userId: "host1",
      username: "Alex Turner",
      message: "Welcome everyone to our discussion on AI in creative industries!",
      timestamp: Date.now() - 3600000
    },
    {
      id: "msg1-2",
      userId: "speaker1",
      username: "Maya Johnson",
      message: "Thanks for having me. I'm excited to share my experience with AI-generated art.",
      timestamp: Date.now() - 3540000
    },
    {
      id: "msg1-3",
      userId: "listener1",
      username: "Sofia Garcia",
      message: "Question: How do you see AI affecting job prospects for traditional artists?",
      timestamp: Date.now() - 3480000
    },
    {
      id: "msg1-4",
      userId: "speaker2",
      username: "Ethan Zhang",
      message: "Great question Sofia. I think AI will be more of a tool than a replacement.",
      timestamp: Date.now() - 3420000
    },
    {
      id: "msg1-5",
      userId: "listener2",
      username: "James Wilson",
      message: "I've been experimenting with Midjourney and the results are impressive!",
      timestamp: Date.now() - 3360000
    }
  ],
  "2": [
    {
      id: "msg2-1",
      userId: "host2",
      username: "Melody Waves",
      message: "Dropping some chill beats to help everyone focus and relax 🎵",
      timestamp: Date.now() - 2400000
    },
    {
      id: "msg2-2",
      userId: "speaker21",
      username: "Jazz Master",
      message: "This track has such a nice blend of jazz samples and lo-fi elements",
      timestamp: Date.now() - 2340000
    },
    {
      id: "msg2-3",
      userId: "listener21",
      username: "Rhythm King",
      message: "Perfect for my late night coding session 💻",
      timestamp: Date.now() - 2280000
    },
    {
      id: "msg2-4",
      userId: "listener22",
      username: "Beats Queen",
      message: "Can you share the playlist link after the session?",
      timestamp: Date.now() - 2220000
    },
    {
      id: "msg2-5",
      userId: "host2",
      username: "Melody Waves",
      message: "Absolutely! I'll drop it in the chat when we wrap up",
      timestamp: Date.now() - 2160000
    }
  ],
  "3": [
    {
      id: "msg3-1",
      userId: "host3",
      username: "Pixel Master",
      message: "Welcome to our Digital Art Masterclass! Today we're diving into NFTs and beyond.",
      timestamp: Date.now() - 1800000
    },
    {
      id: "msg3-2",
      userId: "speaker31",
      username: "Art Guru",
      message: "I've been creating NFTs for 2 years now. The market has changed dramatically.",
      timestamp: Date.now() - 1740000
    },
    {
      id: "msg3-3",
      userId: "listener31",
      username: "Creative Soul",
      message: "What platforms do you recommend for new artists entering the NFT space?",
      timestamp: Date.now() - 1680000
    },
    {
      id: "msg3-4",
      userId: "speaker33",
      username: "NFT Expert",
      message: "Foundation is great for curated work, but OpenSea has the largest audience.",
      timestamp: Date.now() - 1620000
    },
    {
      id: "msg3-5",
      userId: "listener32",
      username: "Design Enthusiast",
      message: "Has anyone experimented with generative art collections?",
      timestamp: Date.now() - 1560000
    }
  ],
  "4": [
    {
      id: "msg4-1",
      userId: "host4",
      username: "Pro Gamer",
      message: "Let's talk tournament strategies! What games is everyone competing in?",
      timestamp: Date.now() - 1200000
    },
    {
      id: "msg4-2",
      userId: "speaker41",
      username: "Strategy Master",
      message: "I'm focusing on Valorant tournaments this season. The meta is evolving fast.",
      timestamp: Date.now() - 1140000
    },
    {
      id: "msg4-3",
      userId: "speaker43",
      username: "Team Captain",
      message: "Our team just qualified for the regional League championships!",
      timestamp: Date.now() - 1080000
    },
    {
      id: "msg4-4",
      userId: "listener41",
      username: "Casual Gamer",
      message: "Any tips for someone looking to enter their first local tournament?",
      timestamp: Date.now() - 1020000
    },
    {
      id: "msg4-5",
      userId: "speaker44",
      username: "ESports Legend",
      message: "Focus on consistency over flashy plays. And get plenty of sleep before the event!",
      timestamp: Date.now() - 960000
    }
  ],
  "5": [
    {
      id: "msg5-1",
      userId: "host5",
      username: "Tech Founder",
      message: "Welcome to our startup networking hour! Let's share what we're all working on.",
      timestamp: Date.now() - 600000
    },
    {
      id: "msg5-2",
      userId: "speaker51",
      username: "Startup Mentor",
      message: "I'm currently advising three AI startups in the healthcare space.",
      timestamp: Date.now() - 540000
    },
    {
      id: "msg5-3",
      userId: "speaker52",
      username: "VC Partner",
      message: "Our fund is actively looking for investments in sustainable tech and climate solutions.",
      timestamp: Date.now() - 480000
    },
    {
      id: "msg5-4",
      userId: "listener51",
      username: "Aspiring Founder",
      message: "I'm working on a prototype for a new fintech app. Would love some feedback!",
      timestamp: Date.now() - 420000
    },
    {
      id: "msg5-5",
      userId: "speaker55",
      username: "Angel Investor",
      message: "Happy to chat after the session. DM me your pitch deck.",
      timestamp: Date.now() - 360000
    }
  ],
  "6": [
    {
      id: "msg6-1",
      userId: "host6",
      username: "Crypto Enthusiast",
      message: "Welcome to our Web3 & Blockchain discussion! What topics interest you most?",
      timestamp: Date.now() - 300000
    },
    {
      id: "msg6-2",
      userId: "speaker61",
      username: "Blockchain Dev",
      message: "I've been exploring Layer 2 scaling solutions. The progress is impressive.",
      timestamp: Date.now() - 240000
    },
    {
      id: "msg6-3",
      userId: "listener61",
      username: "Crypto Trader",
      message: "What are your thoughts on the recent regulatory developments?",
      timestamp: Date.now() - 180000
    },
    {
      id: "msg6-4",
      userId: "speaker62",
      username: "DeFi Expert",
      message: "Regulation is inevitable, but I think it will ultimately help with mainstream adoption.",
      timestamp: Date.now() - 120000
    },
    {
      id: "msg6-5",
      userId: "speaker63",
      username: "NFT Collector",
      message: "Anyone following the intersection of DeFi and NFTs? Some interesting projects emerging.",
      timestamp: Date.now() - 60000
    }
  ]
};

// Helper function to get chat messages for a room
export const getRoomChats = (id: string): ChatMessage[] => {
  return roomChats[id] || [];
};
