import { onAuthStateChanged } from "firebase/auth";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import setUserOffline from "../helpers/setUserOffline";

function Home() {
  const [linkButton, setLinkButton] = useState();

  // Set the user state
  setUserOffline();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLinkButton(<Link to="/rooms">Step In</Link>);
      } else {
        setLinkButton(<Link to="/sign-in">Sign In</Link>);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div id="home" className="container">
      <Nav pageName="home" />
      <div className="text">
        <h1>Welcome to the chat room of the future</h1>
        <p>
          Where conversations flow freely and connections are made in real-time,
          embracing the digital age with open arms to engage in discussions that
          transcend borders and time zones, fostering friendships and sharing
          ideas without boundaries.
        </p>
      </div>
      {linkButton}
    </div>
  );
}

export default Home;
