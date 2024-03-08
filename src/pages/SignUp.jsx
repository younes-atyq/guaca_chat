import { Link, useNavigate } from "react-router-dom";
import Popup, { setPopup } from "../components/Popup";
import SingUpPopupError from "../helpers/SingUpPopupError";
import singUpAuth from "../helpers/SingUpAuth";

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const pwd = e.target.password.value;
    const confirm = e.target.confirm.value;

    const isValid = SingUpPopupError({ username, email, pwd, confirm });
    if (!isValid) return;
    const isValidAuth = await singUpAuth({ username, email, pwd });
    if (!isValidAuth) navigate("/home");
    if (isValidAuth)
      setPopup({ isPopup: true, heading: "Error", text: isValidAuth });
  };

  return (
    <div id="sign-up" className="container">
      <Popup />
      <h2 className="title">Sign Up</h2>
      <form autoComplete="off" onSubmit={handleSubmit} action="#">
        <label htmlFor="username">
          <span>Username:</span>
          <input type="text" name="username" id="username" />
        </label>
        <label htmlFor="email">
          <span>Email:</span> <input type="text" name="email" id="email" />
        </label>
        <label htmlFor="password">
          <span>Password:</span>
          <input type="password" name="password" id="password" />
        </label>
        <label htmlFor="confirm">
          <span>Confirm Pwd:</span>
          <input type="password" name="confirm" id="confirm" />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
      <p className="auth-info">
        Already have an account?{" "}
        <Link className="auth-link" to={"/sign-in"}>
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
