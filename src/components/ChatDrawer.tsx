import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

// Make sure to install date-fns: npm install date-fns

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
}

interface ChatDrawerProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

// Import the mock data directly here to ensure it's available
const roomChats: Record<string, ChatMessage[]> = {
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

const ChatDrawer: React.FC<ChatDrawerProps> = ({ roomId, isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const chatMessages = roomChats[roomId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the message to your backend
    // For now, we'll just clear the input
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white/10 backdrop-blur-lg border-l border-white/20 shadow-xl z-50 flex flex-col">
      <div className="p-4 border-b border-white/20 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Room Chat</h3>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg: ChatMessage) => (
          <div key={msg.id} className="chat-bubble-in">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {msg.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-white">{msg.username}</span>
                  <span className="text-xs text-white/60">
                    {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-white/80 text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 btn-bounce"
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatDrawer;