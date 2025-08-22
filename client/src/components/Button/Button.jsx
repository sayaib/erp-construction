import React from "react";
import "./Button.css"; // Import the CSS file

const Button = ({ type, onClick, children, theme }) => {
  return (
    <button type={type} onClick={onClick} className="button-submit">
      {children}
    </button>
  );
};

export default Button;
