import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const setUserOffline = async () => {
  if (!sessionStorage.getItem("currentRoom") || !auth?.currentUser?.uid) return;
  try {
    const roomRef = doc(
      db,
      "rooms",
      sessionStorage.getItem("currentRoom"),
      "onlineUsers",
      auth?.currentUser?.uid
    );

    const userPresence = await getDoc(roomRef);
    if (!userPresence.exists() || userPresence.data().state === "offline")
      return;

    updateDoc(roomRef, {
      ...userPresence.data(),
      state: "offline",
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export default setUserOffline;
