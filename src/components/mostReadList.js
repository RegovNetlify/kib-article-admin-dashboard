import React, { useState } from "react";

export const MostReadList = (props) => {
  const [active, setActive] = useState(-1);

  const handleActive = (index) => {
    setActive(index);
  };

  const disableActive = () => {
    setActive(-1);
  };

  const HandleSelect = (id) => {
    if (props.onSelect) {
      props.onSelect(id);
    }
  };

  return (
    <div className="mostread-wrapper">
      <div className="mostread-title">{props.title}</div>
      <div className="reading-list-wrapper">
        {props.list.map((list, index) => {
          return (
            <div
              className="reading-list cursor_pointer"
              onClick={() => HandleSelect(list.slug)}
            >
              <div className="mostread-list-number">{index + 1}</div>
              <div className="mostread-list-content">
                <div
                  className={`mostread-heading ${
                    active === index ? "active" : ""
                  }`}
                  onMouseOver={() => handleActive(index)}
                  onMouseOut={disableActive}
                >
                  {list.heading}
                </div>
                <div className="mostread-sutext">{list.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
