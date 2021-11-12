import React, { useEffect, useRef } from "react"


export const Modal = (props) => {
    const ModalRef = useRef(null)

    const useOutsideClick = (ref, callback) => {
        const handleClick = (e) => {
          if (ref.current && !ref.current.contains(e.target)) {
            // console.log(`tool tip click outside`);
            if(props.open){
                if(props.closeModal)
                props.closeModal()
            }
          }
        }
    const closeOnEscKey = (e) => {
        // console.log('=============keyboard=======================');
        // console.log(e.key);
        // console.log('====================================');
        if(e.key === "Escape"){
            if(props.closeModal){
                props.closeModal()
            }
        }
    }
      
        useEffect(() => {
          document.addEventListener("touchstart", handleClick)
          document.addEventListener("click", handleClick)
          document.addEventListener('keydown',closeOnEscKey)
      
          return () => {
            document.removeEventListener("touchstart", handleClick)
            document.removeEventListener("click", handleClick)
            document.removeEventListener('keydown',closeOnEscKey)
          }
        })
      }

      useEffect(() => {

      },[props.open])

    useOutsideClick(ModalRef, props.closeModal)
    return(
        <div className={`modal_background ${props.open?"open":""} ${props.stateClass?props.stateClass:""}`} style={{paddingTop:props.paddingTop}}>
            <div className={`modal_content `}  ref={ModalRef}>
                {props.children}
            </div>
        </div>
    )
}