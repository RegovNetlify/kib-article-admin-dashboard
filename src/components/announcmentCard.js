import React from "react"

import {Paper} from "./paper"

import {ANNOUNCEMENTCARD} from "../constants"


export const AnnouncementCard = (props) => {
  return (
    <Paper paperStyle={props.secondary ? "announcement_card_paper_sec" : "announcement_card_paper"}>
      <div className="announcement_card_body ">
        <div className="announcement_card_content flex_column">
          {props.tag && (
            <div className={`announcement-tag-wrapper`}>
              {props.tag.map((tag) => {
                return (
                  <div className={`announcement-tag ${props.secondary ? "secondary" : ""}`}>
                    {tag}
                  </div>
                )
              })}
            </div> 
          )}
          {props.heading && <div
            className={
              props.secondary ? "announcement_card_sub_header_Sec" : "announcement_card_sub_header"
            }>
            {props.heading}
          </div>}
          <div
            className={
              props.secondary ? "announcement_card_main_text_sec" : "announcement_card_main_text"
            }>
            {props.main}
          </div>
          <div onClick={props.onClick} className="flex_row_vertical_center announcement_card_read cursor_pointer">
            <div className={props.secondary ? "announcement_card_misc" : ""}>
              {props.misc ? props.misc : "Read More"}
            </div>
            <img
              src={props.secondary ? ANNOUNCEMENTCARD.arrow : ANNOUNCEMENTCARD.image}
              alt={props.secondary ? ANNOUNCEMENTCARD.arrow : ANNOUNCEMENTCARD.image}
              className="announcement_card_arrow"
            />
          </div>
        </div>
      </div>
    </Paper>
  )
}
