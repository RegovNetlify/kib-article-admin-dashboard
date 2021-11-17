import React, { useState } from "react";
import { DROPDOWN } from "../constants";

export const Dropdown = ({ label, options, active, links, disable }) => {
  const [open, setOpen] = useState(false);

  const OpenOptions = () => {
    if (active === true) {
      setOpen(true);
    } else if (active === undefined) {
      setOpen(true);
    }
  };

  return (
    <div
      onMouseEnter={disable ? undefined : OpenOptions}
      onMouseLeave={disable ? undefined : () => setOpen(false)}
      onClick={disable ? undefined : () => setOpen(true)}
      className={"drop_down flex_row_vertical_center dropdown_caret_hidden"}
    >
      <div
        className={
          disable
            ? "flex_row_vertical_center"
            : "flex_row_vertical_center cursor_pointer"
        }
      >
        <div className={disable ? "dropdown_label_disable" : "dropdown_label"}>
          {label}
        </div>
        <img
          src={disable ? DROPDOWN.caretGrey : DROPDOWN.caret}
          alt={disable ? DROPDOWN.caretGrey : DROPDOWN.caret}
          className="dropdown_caret"
        />
      </div>
      {open ? (
        <div className="drop_down_content_container">
          {options.map((text, index) => (
            // <ToolTip title="Under Phase 2 Development" style="drop_down_tooltip">
            <a onClick={() => setOpen(!open)} href={links[index]} key={index}>
              <div className="drop_down_content">{text}</div>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};
