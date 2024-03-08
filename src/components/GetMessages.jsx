const GetMessages = (props) => {
  const { messages } = props;

  return messages.map((message, i) => {
    let time, currentMinute, currentHour;

    if (message?.timestamp) {
      const localDate = new Date(message.timestamp.toDate());
      currentMinute = localDate.getMinutes();
      currentHour = localDate.getHours();
      // format the time
      currentHour = currentHour < 10 ? "0" + currentHour : currentHour;
      currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;
      time = currentHour + ":" + currentMinute;
    }

    return (
      <div key={i} className="message">
        <span className={message?.isAdmin ? "name admin" : "name"}>
          {message.username} <span className="time">{time}</span>
        </span>
        <div dangerouslySetInnerHTML={{ __html: message.message }}></div>
      </div>
    );
  });
};

export default GetMessages;
