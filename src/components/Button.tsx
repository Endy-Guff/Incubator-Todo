import React from "react";
import s from './Button.module.css'


type PropsType ={
    name: string
    callback:()=>void
    class: string
}
export const Button = (props: PropsType) =>{
    const onClickHandler = () =>{
        props.callback()
    }
    return(
        <button className={props.class === 'active' ? s.active : ''} onClick={onClickHandler}>{props.name}</button>
    )
}