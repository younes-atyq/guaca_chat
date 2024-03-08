import { Link, useNavigate } from "react-router-dom";
import Popup, { setPopup } from "../components/Popup";
import signInPopupError from "../helpers/SingInPopupError";
import singInAuth from "../helpers/SignInAuth";

function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pwd = e.target.password.value;
    const isValid = signInPopupError({ email, pwd });
    if (!isValid) return;
    const isNotValidAuth = await singInAuth({ email, pwd });
    if (isNotValidAuth)
      setPopup({ isPopup: true, heading: "Error", text: isNotValidAuth });
    if (!isNotValidAuth) {
      navigate("/rooms");
    }
  };

  return (
    <div id="sign-in" className="container">
      <Popup />
      <h2 className="title">Sign In</h2>
      <form autoComplete="off" onSubmit={handleSubmit} action="#">
        <label htmlFor="email">
          <span>Email:</span> <input type="text" name="email" id="email" />
        </label>
        <label htmlFor="password">
          <span>Password:</span>
          <input type="password" name="password" id="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      <p className="auth-info">
        Don't have an account?{" "}
        <Link className="auth-link" to={"/sign-up"}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
