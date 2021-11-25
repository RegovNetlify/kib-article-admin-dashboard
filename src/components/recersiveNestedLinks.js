import React from "react";

export const RecursiveNestedLink = (props) => {
  const isBrowser = typeof window !== "undefined";
  const handleLink = (link) => {
    if (isBrowser) {
      sessionStorage.clear();
      window.location.href = link;
    }
  };
  return (
    <>
      {props.links.map((link) => {
        return (
          <>
            <div
              onClick={() => handleLink(link.link)}
              className={`cursor_pointer footer-info-link ${
                link.link === "" ? "disabled" : ""
              }`}
            >
              {link.name}
            </div>
            {link.subLink !== undefined && (
              <div
                className={`footer_info_subLink ${props.open ? "open" : ""}`}
              >
                <RecursiveNestedLink links={link.subLink} open={props.open} />
              </div>
            )}
          </>
        );
      })}
    </>
  );
};
