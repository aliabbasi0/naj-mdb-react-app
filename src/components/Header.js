import Nav from "./Nav";
import { useState } from "react";
import logo from "../icons/naj-movie-logo.svg";

function Header() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className={`header ${showNav ? "show" : ""}`}>
      <div className="header-container">
        <a href="/yellowdoor">
          <img src={logo} alt="YellowDoor Logo" />
        </a>
        <button onClick={() => setShowNav(!showNav)} className="hamburger">
          ☰
        </button>
      </div>
      <Nav showNav={showNav} setShowNav={setShowNav} />
    </header>
  );
}

export default Header;
