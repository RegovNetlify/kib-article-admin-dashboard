import React from "react"
  
  export const Paper = ({paperStyle, children}) => {
    return <div className={"paper " + paperStyle}>{children}</div>
  }
  