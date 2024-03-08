import addRoomFunc from "../helpers/AddRoomFunc";
const AddRoom = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;
    addRoomFunc({ roomName: e.target[0].value });
    e.target[0].value = "";
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="add-room"
      action=""
    >
      <input
        id="add-room-input"
        type="text"
        placeholder="add a new room"
        spellCheck="false"
      />
      <button value="submit">+</button>
    </form>
  );
};

export default AddRoom;
