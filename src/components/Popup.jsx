import { useEffect } from "react";

//  Set the pop-up window content
export const setPopup = ({ isPopup, heading, text }) => {
  if (!isPopup) {
    document.querySelector(".pop-up-wrapper").style.display = "none";
    return;
  }
  document.querySelector(".pop-up-wrapper").style.display = "block";
  document.querySelector(".pop-up-header").textContent = heading;
  document.querySelector(".pop-up-text").innerHTML = text;
};

const Popup = () => {
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
    <div className="pop-up-wrapper">
      <div className="pop-up-overlay"></div>
      <div className="pop-up">
        <button className="pop-up-close">X</button>
        <h2 className="pop-up-header">Pop Up test</h2>
        <p className="pop-up-text">Pop Up test Pop Up test</p>
      </div>
    </div>
  );
};

export default Popup;
