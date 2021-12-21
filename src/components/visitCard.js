import React from "react"
import { useState } from "react"

export const VisitCard = (props) => {

    const [mouseEnterButton,setMouseEnterButton] = useState(false)
    return(
    <div className="visit_card_body">
        <div className="visit_card_page_header">
            {props.header}
        </div>

        <div className="visit_card_page_description">
        {props.description}
        </div>
        <a className={`visit_card_button cursor_pointer ${props.href === ""?"disable":""}`} href = {props.href} target="_blank" rel="noreferrer" onMouseEnter={() => setMouseEnterButton(true)} onMouseLeave={() => setMouseEnterButton(false)}>
            <div className="visit_card_button_text">
                {props.buttonText}
                <span style={{marginLeft:"12px"}}>
                <div className={`visit_arrow ${mouseEnterButton?"onHover":""}`}/>
            </span>
            </div> 
        </a>
    </div>)
}