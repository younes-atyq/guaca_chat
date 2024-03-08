import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { setPopup } from "../components/Popup";

const setUserStates = async ({ currentRoom }) => {
  if (!sessionStorage.getItem("currentRoom") || !auth?.currentUser?.uid) return;

  const username = auth?.currentUser?.displayName;
  const userId = auth?.currentUser?.uid;
  const roomRef = collection(db, "rooms", currentRoom, "onlineUsers");

  try {
    const userPresence = await getDoc(
      doc(db, "rooms", currentRoom, "onlineUsers", auth?.currentUser?.uid)
    );

    if (userPresence.exists()) return;

    setDoc(doc(roomRef, userId), {
      username,
      userId,
      state: "online",
      timestamp: serverTimestamp(),
    });

    setPopup({
      isPopup: true,
      heading: "Rules",
      text: "1. Be nice to others <br/> 2. leave the room before deleting the page ty :)",
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export default setUserStates;
