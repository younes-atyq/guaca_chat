import { useEffect, useRef } from "react";

const Popup = ({ isPopup, heading, text }) => {
  const wrapper = useRef();
  const header = useRef();
  const textArea = useRef();

  if (!isPopup) {
    wrapper.current.style.display = "none";
  }
  wrapper.current.style.display = "block";
  header.current.textContent = heading;
  textArea.current.innerHTML = text;

  useEffect(() => {
    // Close the pop-up when clicking outside of it
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("pop-up-close") ||
        e.target.classList.contains("pop-up-overlay")
      ) {
        document.querySelector(".pop-up-wrapper").style.display = "none";
      }
    });
    // Close the pop-up when pressing the escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelector(".pop-up-wrapper").style.display = "none";
      }
    });
  }, []);
  // Render the pop-up window
  return (
    <div ref={wrapper} className="pop-up-wrapper">
      <div className="pop-up-overlay"></div>
      <div className="pop-up">
        <button className="pop-up-close">X</button>
        <h2 ref={header} className="pop-up-header">
          Pop Up test
        </h2>
        <p ref={textArea} className="pop-up-text">
          Pop Up test Pop Up test
        </p>
      </div>
    </div>
  );
};

export default Popup;
