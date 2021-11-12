// import {CustomUploadButton} from './uploadButton'
import React from "react";
import { NestedFooterLinks } from "./footerlinks";
import "../css/footer.css";
import { FOOTER, NEW_FOOTER_INFO_LINKS, TOOLTIPTEXT } from "../constants";
import { ToolTip } from "./tooltip";

export const Footer = () => {
  const handleScrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="footer-wrapper">
      <div className="footer-main-content">
        <div className="social-media-links">
          {FOOTER.socialMedia.map((media, index) => {
            return (
              <a
                key={"image" + index}
                href={media.link}
                //   onMouseOver={() => handleHoverEnter(index)}
                //   onMouseOut={() => handleHoverExit(index)}
              >
                <img
                  src={media.logo}
                  alt={media.logo}
                  className="footer_follow_us_logo"
                />
              </a>
            );
          })}
        </div>

        {/* <div className="info-links">
          {FOOTER.data.map((value,mainIndex) => {
            return (
              <div className="footer-info">
                <span className="footer-heading">{value.heading}</span>
                {value.links.map((link,secondaryIndex) => {
                  return (
                    <>
                      {link.link !== ("" || "#") ? (
                        <a href={link.link} className="footer-info-link" target={(mainIndex === 2 && (secondaryIndex >= 1 && secondaryIndex<4))?"_blank":"_self"} rel="noreferrer">
                          {link.name}
                        </a>
                      ) : (
                        <div className="footer-info-link">
                          <ToolTip title={TOOLTIPTEXT}>
                            <div>{link.name}</div>
                          </ToolTip>
                        </div>
                      )}
                    </>
                  )
                })}
              </div>
            )
          })}
        </div> */}

        <div className="info-links">
          {NEW_FOOTER_INFO_LINKS.map((value) => {
            return (
              <NestedFooterLinks heading={value.heading} links={value.links} />
            );
          })}
        </div>
        <div className="top-page-div">
          <img
            className="cursor_pointer"
            onClick={handleScrollToTop}
            src={FOOTER.upArrow}
            alt={FOOTER.upArrow}
          />
        </div>
      </div>
      <div className="footer-bottom-content">
        <div>{FOOTER.footerCopyright}</div>
        <div className="footer-links">
          {FOOTER.footerLink.map((link, index) => {
            return (
              <>
                {link.link !== "#" || "" ? (
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                    key={index}
                  >
                    {link.name}
                  </a>
                ) : (
                  <div className="footer-link">
                    <ToolTip title={TOOLTIPTEXT}>
                      <div>{link.name}</div>
                    </ToolTip>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
