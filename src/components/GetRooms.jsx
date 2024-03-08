import { useContext } from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../App";

const GetRooms = (props) => {
  const { rooms } = props;

  const chosenRoom = useContext(RoomContext);
  return rooms.map((room) => {
    // Prettify the room URL
    const roomURL = room.name.replace(/\s+/g, "-");
    // Get the date
    const seconds = room?.timestamp?.seconds || new Date().getSeconds();
    const date = new Date(seconds * 1000);
    const formattedDate = date.toISOString().split("T")[0];
    return (
      <Link
        onClick={() =>
          chosenRoom.setRoom([room.name, room.adminName, room.adminId])
        }
        key={room.id}
        to={`/chat/${roomURL}`}
        className="room"
      >
        <div className="room-name">{room.name}</div>
        <div className="online-users">
          <span className="count-online-users">{formattedDate}</span>
        </div>
      </Link>
    );
  });
};

export default GetRooms;
