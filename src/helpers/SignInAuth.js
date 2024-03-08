import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const singInAuth = async ({ email, pwd }) => {
  return await signInWithEmailAndPassword(auth, email, pwd)
    .then(() => {
      return false;
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else {
        errorMessage = "An error occurred. Please try again.";
      }
      return errorMessage;
    });
};

export default singInAuth;
