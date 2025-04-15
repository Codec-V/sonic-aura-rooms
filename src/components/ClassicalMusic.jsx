import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ClassicalMusic = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeUsers, setActiveUsers] = useState([
    { displayName: "ClassicalPianist", id: "demo1" },
    { displayName: "OrchestraConductor", id: "demo2" },
    { displayName: "ViolinVirtuoso", id: "demo3" },
    { displayName: "MozartFan", id: "demo4" }
  ]);
}
  // ... rest of the code remains the same