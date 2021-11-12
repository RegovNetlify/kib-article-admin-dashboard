import React from "react";
import { useState } from "react";
import { ArrowBottomBlackICON } from "../img/arrow_bottom";
import { RecursiveNestedLink } from "./recersiveNestedLinks";

export const NestedFooterLinks = (props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  let hasSublinks =
    props.links.filter((link) => {
      return link.hasOwnProperty("subLink");
    }).length > 0;
  return (
    <div className="footer-info">
      <div
        className={`footer-heading cursor_pointer flex_row ${
          hasSublinks ? "" : "noHover"
        }`}
        onClick={handleClick}
      >
        <span>{props.heading}</span>

        {hasSublinks && (
          <div className={`nested_arrow_bottom_link ${open ? "open" : ""}`}>
            <ArrowBottomBlackICON />
          </div>
        )}
      </div>
      <RecursiveNestedLink links={props.links} open={open} />
    </div>
  );
};
