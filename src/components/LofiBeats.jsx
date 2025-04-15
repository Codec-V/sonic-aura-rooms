import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const LofiBeats = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeUsers, setActiveUsers] = useState([
    { displayName: "LofiProducer", id: "demo1" },
    { displayName: "ChillVibes", id: "demo2" },
    { displayName: "StudySession", id: "demo3" },
    { displayName: "BeatsCreator", id: "demo4" }
  ]);
}