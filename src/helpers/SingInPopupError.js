import { setPopup } from "../components/Popup";

const signInPopupError = ({ email, pwd }) => {
  let isValid;
  let error = null;

  // check all fields are filled
  if (email === "" || pwd === "") error = "Please fill in all fields";

  // check if email is valid
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!error && !emailRegex.test(email)) error = "Please enter a valid email";

  // check the password is more than 6 characters
  if (!error && pwd.length < 6)
    error = "Password must be at least 6 characters";

  // if there's an error
  if (error) {
    const popupErr = error;
    setPopup({ isPopup: true, heading: "Error", text: popupErr });
    isValid = false;
  } else {
    setPopup({ isPopup: false, heading: null, text: null }); // Clear the error message
    isValid = true;
  }

  return isValid;
};

export default signInPopupError;
