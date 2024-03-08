import { useContext, useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useAuthRedirect from "../hooks/useAuthRedirect";
import SendMsgUI from "../helpers/SendMsgUI";
import { auth, db, queryCurrentRoomMessages } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { RoomContext } from "../App";
import setUserOnline from "../helpers/setUserOnline";
import { Link, useNavigate } from "react-router-dom";
import setUserStates from "../helpers/setUserStates";
import Popup from "../components/Popup";
import GetMessages from "../components/GetMessages";

const Chat = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [messages, setMessages] = useState([]);
  const chat = useRef();
  const sidebar = useRef();
  const currentRoom = useContext(RoomContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();
  const sendMsgBtn = useRef();
  const editor = useRef();

  // Persist current room in sessionStorage to maintain state through page reload
  if (currentRoom?.room) {
    sessionStorage.setItem("currentRoom", currentRoom.room[0]);
    sessionStorage.setItem("roomAdmin", currentRoom.room[1]);
    sessionStorage.setItem("roomAdminId", currentRoom.room[2]);
  }

  const currentRoomName = sessionStorage.getItem("currentRoom");

  const currentRoomAdmin = sessionStorage.getItem("roomAdmin");

  const currentRoomAdminId = sessionStorage.getItem("roomAdminId");

  // Set the current user online state
  useAuthRedirect();
  setUserStates({
    currentRoom: currentRoomName,
  });

  setUserOnline({
    currentRoom: currentRoomName,
  });

  // scroll the chat to the bottom
  useEffect(() => {
    chat.current?.scrollTo(0, chat.current?.scrollHeight);
  }, [messages, props]);

  // Send the message
  const handleClick = () => {
    if (!chat?.current || !editorState.getCurrentContent().hasText()) return;
    SendMsgUI({
      editorState,
      setEditorState,
      EditorState,
      currentRoom: currentRoomName,
      isAdmin: auth.currentUser.uid === currentRoomAdminId,
    });
  };

  // Get the messages from the database
  useEffect(() => {
    // The only way I found to get the current room because the URL path is not related to the chat
    let room = currentRoomName;
    const unsubscribe = onSnapshot(
      queryCurrentRoomMessages(room),
      (snapshot) => {
        let messages = [];
        if (!snapshot) return;
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      }
    );
    return () => unsubscribe();
  }, [currentRoomName]);

  // Mange user states
  useEffect(() => {
    const roomRef = collection(db, "rooms", currentRoomName, "onlineUsers");
    const unsubscribe = onSnapshot(roomRef, (users) => {
      const onlineUsers = [];
      users.forEach((user) => {
        if (user.data().state === "offline") return;
        onlineUsers.push({
          username: user.data().username,
          userId: user.data().userId,
        });
      });
      setOnlineUsers(onlineUsers);
    });
    return () => unsubscribe();
  }, [currentRoomName]);

  // Delete room
  const deleteRoom = async () => {
    const roomRef = doc(db, "rooms", currentRoomName);
    try {
      await deleteDoc(roomRef);
      await getDocs(collection(db, "rooms", currentRoomName, "messages")).then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        }
      );
      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const roomRef = doc(db, "rooms", currentRoomName);
      const room = await getDoc(roomRef);
      if (!room.exists()) navigate("/rooms");
    };
    return () => unsubscribe();
  });

  // // "ctrl + enter" method has an issue
  // useEffect(() => {
  //   console.log("GET IN");
  //   const unsubscribe = document.addEventListener("keydown", (e) => {
  //     if (!chat?.current || !editorState.getCurrentContent().hasText()) return;
  //     if (e.ctrlKey && e.key === "Enter") {
  //       e.preventDefault();
  //       console.log("hey");
  //       sendMsgBtn.current.click();
  //     }
  //   });
  //   return () => unsubscribe;
  // }, [editorState]);

  return (
    <div id="chat" className="container">
      <Popup />
      <Nav pageName="rooms" preventDefault={false} />
      <div ref={chat} id="messages">
        <GetMessages messages={messages} />
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

      <aside ref={sidebar} id="room-info">
        <h2 id="room-name">{currentRoomName}</h2>
        <h3>Admin: {currentRoomAdmin}</h3>
        {auth?.currentUser?.uid === currentRoomAdminId && (
          <button onClick={deleteRoom} className="btn" id="delete-room">
            Delete Room
          </button>
        )}
        <div id="online-users">
          <h3>Online users:</h3>
          <ul>
            {onlineUsers.map((user, i) => {
              return <li key={i}>{user.username}</li>;
            })}
          </ul>
        </div>
        <Link className="btn" id="go-back" to={"/rooms"}>
          Back
        </Link>
      </aside>

      <div id="input-field">
        <Editor
          ref={editor}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          toolbarClassName="toolbar"
          toolbar={{
            options: ["inline", "blockType", "list"],
            inline: {
              inDropdown: false,
              options: ["bold", "italic", "underline"],
            },
            blockType: {
              inDropdown: true,
              options: ["H1", "unordered-list-item", "ordered-list-item"],
            },
          }}
        />
        <div>
          <button
            ref={sendMsgBtn}
            onClick={handleClick}
            title="Ctrl + Enter"
            id="send"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
