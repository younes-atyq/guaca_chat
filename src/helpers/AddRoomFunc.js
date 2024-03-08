import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { setPopup } from "../components/Popup";

// Add a new room to the database, and throw an error if the room already exists.
const addRoomFunc = async ({ roomName }) => {
  try {
    const room = await getDoc(doc(db, "rooms", roomName));

    if (room.exists()) throw new Error("Room already exists");
    try {
      getDocs(collection(db, "rooms", roomName, "messages")).then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        }
      );
      getDocs(collection(db, "rooms", roomName, "onlineUsers")).then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        }
      );
    } catch (error) {
      console.log("no data on it");
    }
    await setDoc(doc(db, "rooms", roomName), {
      name: roomName,
      adminId: auth?.currentUser?.uid,
      adminName: auth?.currentUser?.displayName,
      timestamp: serverTimestamp(),
      messages: [],
      onlineUsers: [],
    });
  } catch (error) {
    setPopup({ isPopup: true, heading: "Error", text: error.message });
  }
};

export default addRoomFunc;
