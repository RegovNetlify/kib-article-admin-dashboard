import React from "react"

export const RecursiveNestedLink = (props) => {
    return (
        <>
            {props.links.map(link => {
                return(
                    <>
                    <a href={link.link} className={`footer-info-link ${link.link === ''?"disabled":""}`} target={link.target ?"_blank":"_self"} rel="noreferrer">
                  {link.name}
                </a>
                    {link.subLink !== undefined && 
                    <div className={`footer_info_subLink ${props.open?"open":""}`}>
                    <RecursiveNestedLink
                    links={link.subLink} open={props.open}/>
                    </div>
                    }
                    </>
                )
            })}
        </>
    )
}