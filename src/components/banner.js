import React from "react"
  
  export const Banner = ({height, img, children, style}) => {
    return (
      <div
        className={`banner ${style ? style : ""} `}
        style={{minHeight: height, backgroundImage: `url(${img})`, height: height}}>
        {children}
      </div>
    )
  }
  