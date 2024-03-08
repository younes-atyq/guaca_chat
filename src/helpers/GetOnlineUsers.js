// Built to return online users in all rooms, Not used yet, but back to it later

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const getOnlineUsers = async (roomName) => {
  const roomRef = collection(db, "rooms", roomName, "onlineUsers");

  // const onlineUsers = await
  // const onlineUsers = [];

  try {
    const onlineUsers = await getDocs(roomRef, (users) => {
      // const onlineUsers = [];
      users.docs.forEach((user) => {
        console.log(user);
      });
    });
    return onlineUsers.length;
  } catch (error) {}
};

export default getOnlineUsers;
