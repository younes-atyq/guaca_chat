import Nav from "../components/Nav";
import useAuthRedirect from "../hooks/useAuthRedirect.js";
import { auth, colRooms } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import Popup from "../components/Popup";
import GetRooms from "../components/GetRooms";
import AddRoom from "../components/AddRoom";
import { debounce } from "lodash";
import setUserOffline from "../helpers/setUserOffline.js";

const searchIcon = (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="36" height="36" fill="#fff" />
    <path
      d="M26.71 25.29L22.31 20.9C23.407 19.5025 24.0022 17.7767 24 16C24 14.4178 23.5308 12.871 22.6518 11.5554C21.7727 10.2398 20.5233 9.21447 19.0615 8.60897C17.5997 8.00347 15.9911 7.84504 14.4393 8.15372C12.8874 8.4624 11.462 9.22433 10.3431 10.3431C9.22433 11.462 8.4624 12.8874 8.15372 14.4393C7.84504 15.9911 8.00347 17.5997 8.60897 19.0615C9.21447 20.5233 10.2398 21.7727 11.5554 22.6518C12.871 23.5308 14.4178 24 16 24C17.7767 24.0022 19.5025 23.407 20.9 22.31L25.29 26.71C25.383 26.8037 25.4936 26.8781 25.6154 26.9289C25.7373 26.9797 25.868 27.0058 26 27.0058C26.132 27.0058 26.2627 26.9797 26.3846 26.9289C26.5064 26.8781 26.617 26.8037 26.71 26.71C26.8037 26.617 26.8781 26.5064 26.9289 26.3846C26.9797 26.2627 27.0058 26.132 27.0058 26C27.0058 25.868 26.9797 25.7373 26.9289 25.6154C26.8781 25.4936 26.8037 25.383 26.71 25.29ZM16 22C14.8133 22 13.6533 21.6481 12.6666 20.9888C11.6799 20.3295 10.9109 19.3925 10.4567 18.2961C10.0026 17.1997 9.88378 15.9933 10.1153 14.8295C10.3468 13.6656 10.9182 12.5965 11.7574 11.7574C12.5965 10.9182 13.6656 10.3468 14.8295 10.1153C15.9933 9.88378 17.1997 10.0026 18.2961 10.4567C19.3925 10.9109 20.3295 11.6799 20.9888 12.6666C21.6481 13.6533 22 14.8133 22 16C22 17.5913 21.3679 19.1174 20.2426 20.2426C19.1174 21.3679 17.5913 22 16 22Z"
      fill="black"
    />
  </svg>
);

const Rooms = () => {
  useAuthRedirect();
  setUserOffline();
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const sidebar = useRef();

  const debouncedSetSearch = debounce(setSearch, 200);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUsername(user.displayName);
    }
  });

  // Ik there is no point from adding this button, but I'll add it anyway
  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let q;
    if (!search) q = query(colRooms, orderBy("timestamp", "desc"));
    else
      q = query(
        colRooms,
        where("name", ">=", search),
        where("name", "<=", search + "\uf8ff")
      );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = [];
      snapshot.forEach((doc) => {
        rooms.push({ ...doc.data(), id: doc.id });
      });
      setRooms(rooms);
    });
    return () => unsubscribe();
  }, [search]);

  // Get Online users
  // useEffect(() => {
  //   rooms.forEach((room) => {
  //     console.log(room);
  //   });
  // }, [rooms]);

  // useEffect(() => {
  //   const unsubscribeCallbacks = rooms.map((room) => {
  //     const roomRef = collection(db, "rooms", room.name, "onlineUsers");
  //     const unsubscribe = onSnapshot(roomRef, (snapshot) => {
  //       const onlineUsers = snapshot.docs.filter(
  //         (doc) => doc.data().state === "online"
  //       ).length;
  //       console.log(onlineUsers);
  //       setOnlineUsers((users) => users + onlineUsers);
  //     });

  //     return unsubscribe;
  //   });

  //   return () => {
  //     unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
  //   };
  // }, [rooms]);

  return (
    <div id="rooms" className="container">
      <Nav pageName="rooms" />
      <Popup />
      <div id="search">
        <form onSubmit={handleSearch} action="#">
          <input
            type="text"
            placeholder="Search for rooms..."
            id="search-input"
            className="search-input"
            onChange={(e) => debouncedSetSearch(e.target.value)}
          />
          <button value="submit" id="search-icon">
            {searchIcon}
          </button>
        </form>
      </div>
      <button
        onClick={(e) => {
          sidebar.current?.classList.toggle("active");
          e.target?.classList.toggle("active");
        }}
        className="menu-btn"
      >
        &rarr;
      </button>
      <aside ref={sidebar} id="user-information">
        <h2 id="username">{username}</h2>
        <button id="logout" onClick={() => signOut(auth)}>
          Logout
        </button>
      </aside>
      <div id="results">
        <AddRoom />
        <GetRooms rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
