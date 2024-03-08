import { setPopup } from "../components/Popup";

const singUpPopupError = ({ username, email, pwd, confirm }) => {
  let isValid;
  let error = null;
  // check all fields are filled
  if (username === "" || email === "" || pwd === "" || confirm === "")
    error = "Please fill in all fields";
  // check if email is valid
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!error && !emailRegex.test(email)) error = "Please enter a valid email";
  // check the password is more than 6 characters
  if (!error && pwd.length < 6)
    error = "Password must be at least 6 characters";
  // check if the passwords match
  if (!error && pwd !== confirm) error = "Passwords do not match";
  // if there's an error
  if (error) {
    setPopup({ isPopup: true, heading: "Error", text: error });
    isValid = false;
  } else {
    setPopup({ isPopup: false, heading: null, text: null }); // Clear the error message
    isValid = true;
  }
  return isValid;
};

export default singUpPopupError;
