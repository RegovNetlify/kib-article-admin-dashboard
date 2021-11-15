import React from "react";
import { useHistory } from "react-router-dom";
import { ANNOUNCEMENTCARD } from "../constants";

export const FeaturedCard = (props) => {
  let history = useHistory();
  const HandleClick = () => {
    history.push(`/SingleArticle/${props.id}`);
  };

  return (
    <div>
      <p className="feature-title">{props.title}</p>
      <img className="feature-image" src={props.image} alt={props.image} />
      <p className="feature-main-title">{props.mainTitle}</p>
      <p className="feature-maintext">{props.maintext}</p>
      <div
        className="flex_row_vertical_center announcement_card_read cursor_pointer"
        onClick={HandleClick}
      >
        <div className={"announcement_card_misc"}>{"Read More"}</div>
        <img
          src={ANNOUNCEMENTCARD.arrow}
          alt={ANNOUNCEMENTCARD.arrow}
          className="announcement_card_arrow"
        />
      </div>
    </div>
  );
};
