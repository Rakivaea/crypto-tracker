import React from "react";
import "./Navbar.css";
import "../../styles/colors.css";

export default function Navbar() {
  return (
    <header className="light-mode--background">
      <h1 className="header--title light-mode--headline">Crypto tracker!</h1>
      <nav>
        <ul>
          <li>Test 1</li>
          <li>Test 2</li>
        </ul>
      </nav>
    </header>
  );
}
