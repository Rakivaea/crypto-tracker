import React from "react";
import "./LoadMoreButton.css";

export default function loadMoreButton(props) {
  return (
    <button
      onClick={props.handleClick}
      className="loadMoreButton"
      type="button"
    >
      +
    </button>
  );
}
