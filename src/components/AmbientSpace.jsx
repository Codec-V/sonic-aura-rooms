import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const AmbientSpace = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeUsers, setActiveUsers] = useState([
    { displayName: "AmbientArtist", id: "demo1" },
    { displayName: "SoundDesigner", id: "demo2" },
    { displayName: "MeditationGuide", id: "demo3" }
  ]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }

    // Subscribe to active users in this room
    const roomRef = doc(db, "rooms", "ambient-space");
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const roomData = doc.data();
        setActiveUsers(roomData.activeUsers || []);
      }
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  return (
    <div className="ambient-space-container">
      {/* ... existing code ... */}
      
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
      
      {/* ... rest of the existing code ... */}
    </div>
  );
};

export default AmbientSpace;