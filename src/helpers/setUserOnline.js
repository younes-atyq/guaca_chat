import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const setUserOnline = async ({ currentRoom }) => {
  if (!sessionStorage.getItem("currentRoom") || !auth?.currentUser?.uid) return;

  try {
    const roomRef = doc(
      db,
      "rooms",
      currentRoom,
      "onlineUsers",
      auth?.currentUser?.uid
    );

    const userPresence = await getDoc(roomRef);
    if (!userPresence.exists() || userPresence.data().state === "online")
      return;

    updateDoc(roomRef, {
      ...userPresence.data(),
      state: "online",
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export default setUserOnline;
