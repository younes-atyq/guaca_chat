import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const singUpAuth = async ({ username, email, pwd }) => {
  return await createUserWithEmailAndPassword(auth, email, pwd)
    .then(() => {
      updateProfile(auth.currentUser, { displayName: username }).then(() => {
        setDoc(doc(db, "users", auth.currentUser.uid), {
          username: username,
          email: email,
          uid: auth.currentUser.uid,
        })
          .then(() => {
            return false;
          })
          .catch((error) => {
            throw error;
          });
      });
    })
    .catch((error) => {
      let errorMessage = "";
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else {
        errorMessage = error.message;
      }
      return errorMessage;
    });
};

export default singUpAuth;
