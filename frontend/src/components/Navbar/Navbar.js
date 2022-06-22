import React from "react";
import "./Navbar.css";
import "../../styles/colors.css";

export default function Navbar() {
  return (
    <header className="background--light-mode">
      <h1 className="header__title headline--light-mode">Crypto tracker!</h1>
      <nav>
        <ul>
          <li>Test 1</li>
          <li>Test 2</li>
        </ul>
      </nav>
    </header>
  );
}
