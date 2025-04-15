import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import ChatDrawer from "./ChatDrawer";

const Web3BlockchainDiscussion = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeUsers, setActiveUsers] = useState([
    { displayName: "CryptoExpert", id: "demo1" },
    { displayName: "BlockchainDev", id: "demo2" },
    { displayName: "NFTCollector", id: "demo3" },
    { displayName: "DeFiAnalyst", id: "demo4" }
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }

    // Subscribe to active users in this room
    const roomRef = doc(db, "rooms", "web3-blockchain-discussion");
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const roomData = doc.data();
        setActiveUsers(roomData.activeUsers || []);
      }
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio control logic here
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="room-container bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Content Area */}
          <div className="flex-1 glass-card p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">Web3 & Blockchain Discussion</h1>
            
            <div className="mb-6">
              <p className="text-white/80 mb-4">
                Join the conversation about the future of decentralized technology, cryptocurrencies, 
                smart contracts, and the evolving Web3 ecosystem.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={toggleAudio} 
                  className={`btn-bounce rounded-full p-3 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isPlaying ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    )}
                  </svg>
                </button>
                <span className="text-white font-medium">
                  {isPlaying ? 'Stop Audio' : 'Start Audio'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Today's Topics</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  <li>DeFi innovations and yield farming</li>
                  <li>NFT marketplaces and digital ownership</li>
                  <li>Layer 2 scaling solutions</li>
                  <li>DAOs and decentralized governance</li>
                  <li>Regulatory challenges in crypto</li>
                </ul>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Room Guidelines</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  <li>Be respectful of different opinions</li>
                  <li>No financial advice or shilling</li>
                  <li>Focus on technology and use cases</li>
                  <li>Share resources and educational content</li>
                  <li>Beginners are welcome - ask questions!</li>
                </ul>
              </div>
            </div>
            
            <div className="glass-card p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Featured Projects</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <p className="text-white text-sm">Ethereum</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <p className="text-white text-sm">Solana</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <p className="text-white text-sm">Polkadot</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <p className="text-white text-sm">Algorand</p>
                </div>
              </div>
            </div>
            
            {/* Add chat button here, inside the main content area */}
            <div className="flex justify-end mb-4">
              <button 
                onClick={toggleChat}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 btn-bounce"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Room Chat
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Active Speakers Section */}
            <div className="active-speakers-container">
              <h3>Active Speakers</h3>
              <div className="active-users-list">
                {activeUsers.length > 0 ? (
                  activeUsers.map((user, index) => (
                    <div key={index} className="active-user">
                      <div className="user-avatar">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : "?"}
                      </div>
                      <span>{user.displayName || "Anonymous"}</span>
                    </div>
                  ))
                ) : (
                  <p>No active speakers at the moment</p>
                )}
              </div>
            </div>
            
            {/* Resources Section */}
            <div className="glass-card p-4">
              <h3 className="text-xl font-semibold text-white mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-300 hover:text-blue-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Web3 Fundamentals Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-blue-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Smart Contract Security Best Practices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-blue-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    DeFi Ecosystem Map
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Upcoming Events */}
            <div className="glass-card p-4">
              <h3 className="text-xl font-semibold text-white mb-3">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-blue-300 text-sm">May 15, 2023</p>
                  <h4 className="text-white font-medium">NFT Market Analysis</h4>
                  <p className="text-white/70 text-sm">With guest speaker from OpenSea</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-blue-300 text-sm">May 22, 2023</p>
                  <h4 className="text-white font-medium">DeFi Security Workshop</h4>
                  <p className="text-white/70 text-sm">Audit techniques and common vulnerabilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Drawer */}
      <ChatDrawer 
        roomId="6" 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Web3BlockchainDiscussion;