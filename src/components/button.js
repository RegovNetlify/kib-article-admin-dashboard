import React from "react";

export function Button({
  primary,
  secondary,
  buttonText,
  icon,
  primaryWhite,
  ...rest
}) {
  return (
    <button
      className={`custom_button ${primary ? "primary" : ""}${
        secondary ? "secondary" : ""
      }${primaryWhite ? "primary_white" : ""}`}
      {...rest}
    >
      {buttonText}
      {icon !== undefined ? (
        <div className="custom_button_icon">
          <img height="100%" width="100%" src={icon} alt={"pointer"} />
        </div>
      ) : null}
    </button>
  );
}
