import React from "react"

import { VisitCard } from "./visitCard"


export const LoginCard = (props) => {
    return(<div className="login_Card_body">
        <div className="login_headers">
            <div className="login_headers_main">{props.main}</div>
            <div className="login_headers_sub">{props.sub}</div>
        </div>
        {props.visitCard.map(card => {
            return (
                <VisitCard
                key={card.header + props.main}
                header = {card.header}
                description = {card.description}
                buttonText = {props.buttonText}
                href={card.href}
                />
            )
        })}
    </div>)
}