import { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = ({ pageName, preventDefault = true }) => {
  useEffect(() => {
    const link = document.querySelector(`[data-${pageName}]`);
    link?.classList.add("active");
    // Prevent the default behavior of the link
    // The rooms page gets stuck in a rendering loop
    if (!preventDefault) return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }, [pageName, preventDefault]);
  return (
    <nav id="nav">
      <ul>
        <li>
          <Link data-home className="link" to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link data-rooms className="link" to={"/rooms"}>
            Green Rooms
          </Link>
        </li>
        <li>
          <Link data-about className="link" to={"/about"}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
