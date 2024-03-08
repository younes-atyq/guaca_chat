import Nav from "../components/Nav";
import setUserOffline from "../helpers/setUserOffline";

const About = () => {
  // Set the user state
  setUserOffline();
  return (
    <div id="about" className="container">
      <Nav pageName="about" />
      <div className="text">
        <h1>About</h1>
        <p>
          Welcome to the first chat room ever created! Our platform is a
          pioneering space where individuals from all over the world can
          connect, communicate, and engage in real-time conversations. With
          cutting-edge technology and a user-friendly interface, our chat room
          revolutionizes the way people interact online. Join us in this
          exciting journey of digital communication and experience the future of
          social networking firsthand!
        </p>
      </div>
    </div>
  );
};

export default About;
