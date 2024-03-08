import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState("");
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer id="footer">
      <div className="container">
        <p>
          © <span>{year}</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
