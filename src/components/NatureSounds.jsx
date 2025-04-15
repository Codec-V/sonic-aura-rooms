import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const NatureSounds = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeUsers, setActiveUsers] = useState([
    { displayName: "NatureExplorer", id: "demo1" },
    { displayName: "WildlifeEnthusiast", id: "demo2" },
    { displayName: "EcoListener", id: "demo3" }
  ]);
}
  // ... rest of the code remains the same