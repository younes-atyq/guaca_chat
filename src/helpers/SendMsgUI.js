import { convertToHTML } from "draft-convert";
import SendMsg from "./SendMsg";
import { auth } from "../firebase";

const sendMsgUI = ({
  editorState,
  setEditorState,
  EditorState,
  currentRoom,
  isAdmin,
}) => {
  const html = convertToHTML(editorState.getCurrentContent());

  const message = document.createElement("div");
  const textMsg = document.createElement("div");

  textMsg.innerHTML = html;
  textMsg.className = "text-msg";

  // const name = document.createElement("h3");
  // name.className = "name";
  // if (isAdmin) {
  //   name.id = "admin";
  //   name.prepend("@");
  // }
  // get the username
  const username = auth.currentUser.displayName;
  // get the current time
  // let currentMinute = new Date().getMinutes();
  // let currentHour = new Date().getHours();
  // // format the time
  // currentHour = currentHour < 10 ? "0" + currentHour : currentHour;
  // currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;
  // const time = currentHour + ":" + currentMinute;

  // name.innerHTML = `${username} `;
  // append the name and the message
  // message.append(name);
  message.append(textMsg);
  // set the converted content
  const messageContent = message.innerHTML;
  // reset the editor
  setEditorState(EditorState.createEmpty());
  // send the message
  SendMsg({ message: messageContent, username, currentRoom, isAdmin });
};

export default sendMsgUI;
