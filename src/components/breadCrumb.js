import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { BREADCRUMB } from "../constants";

export function BreadCrumb({ pathName }) {
  let path = pathName.split("/");
  let history = useHistory();
  path.shift();
  path[0] = "Home";

  const handleClick = (tab) => {
    if (tab === "Home") {
      history.push("/");
    } else if (tab === "Articles") {
      history.push("/articlecatalog");
    } else if (tab === "AMP") {
      history.push("/amp");
    } else if (tab === "Funds") {
      history.push("/dailyfund");
    }
  };

  return (
    <div>
      <div className="flex_row_vertical_center">
        {path.map((text, index) => (
          <Fragment>
            <div
              onClick={() => handleClick(text)}
              className={
                index !== path.length - 1
                  ? "bread_crumb_text"
                  : "bread_crumb_text_last"
              }
            >
              {text}
            </div>
            {index !== path.length - 1 ? (
              <img
                src={BREADCRUMB.caret_right}
                alt={BREADCRUMB.caret_right}
                className="bread_crumb_image"
              />
            ) : undefined}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
