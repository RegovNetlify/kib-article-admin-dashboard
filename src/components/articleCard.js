import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { ANNOUNCEMENTCARD } from "../constants";

export const ArticleCard = (props) => {
  const [active, setActive] = useState(false);
  let history = useHistory();

  const handleActive = () => {
    setActive(true);
  };

  const disableActive = () => {
    setActive(false);
  };

  function handleClick() {
    // if(props.notice){
    //   history.push(`/SingleNotice/${props.articleId}`)
    // }else{
    // history.push(`/article/${props.slug}`);
    window.location.pathname = `${props.slug}`;
    // }
  }

  return (
    <div
      onClick={handleClick}
      className={`article-card-container ${
        active ? "active" : ""
      } cursor_pointer`}
      onMouseOver={handleActive}
      onMouseLeave={disableActive}
    >
      <div className="article-tags-wrapper">
        {props.tags.map((tag) => {
          return (
            <div className="article-tags">
              <div
                className="article-tags-text"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setTag(tag, 1);
                }}
              >
                {tag}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`article-title ${active ? "active" : ""}`}>
        {props.heading}
      </div>

      <div className="article-mete-data">
        <div>{props.date.replace(",", "")}</div>
        {!props.notice && (
          <>
            <div className="vertical"></div>
            <div>
              By{" "}
              <b
                className="article_author_text"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setTag(props.author, 2);
                }}
              >
                {props.author}
              </b>
            </div>
          </>
        )}
      </div>

      <div className="article-main-content">{props.shortDescription}</div>

      <div className="article-readmore flex_row_vertical_center">
        <div className={"article-readmore-text"}>Read More</div>
        <img
          src={ANNOUNCEMENTCARD.arrow}
          alt={ANNOUNCEMENTCARD.arrow}
          className="announcement_card_arrow"
        />
      </div>
    </div>
  );
};
