import React, {FunctionComponent, useState, useRef, useEffect} from "react"

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      // console.log(`tool tip click outside`);

      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("touchstart", handleClick)

    return () => {
      document.removeEventListener("touchstart", handleClick)
    }
  })
}

export const ToolTip = (props) => {
  const [hover, setHover] = useState(false)
  const ToolTipRef = useRef(null)
  const showTooltip = () => {
    setHover(true)
  }
  const hideTooltip = () => {
    setHover(false)
  }
  const toggleTooTip = () => {
    setHover(!hover)
  }
  useOutsideClick(ToolTipRef, hideTooltip)
  return (
    <>
      <div
        className={`tooltip ${hover ? "show" : "hide"} ` + props.style}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onTouchStart={toggleTooTip}
        ref={ToolTipRef}>
        <span className={props.bottom ? "tooltiptextbottom" : "tooltiptext flex_row_center"}>
          <p>{props.title}</p>
        </span>
        {props.children}
      </div>
    </>
  )
}
