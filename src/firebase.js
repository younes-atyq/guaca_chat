import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";

// setup firebase
const firebaseConfig = "YOUR_CONFIG_HERE";
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth();

// Initialize Storage
export const storage = getStorage();

// Initialize firestore
export const db = getFirestore();

// rooms collection
export const colRooms = collection(db, "rooms");

// Queries the current room for messages
export const queryCurrentRoomMessages = (roomName) =>
  query(collection(db, "rooms", roomName, "messages"), orderBy("timestamp"));
