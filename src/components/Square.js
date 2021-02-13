import React from 'react'
import "../style.css"
function Square(props){
    const classname=props.classname
    let color=(classname!==null)?"red":"#34495e";
    return(
        <button className="square" onClick={props.onClick} style={{backgroundColor:color}}>
        {props.value}
      </button>
    )
}
export default Square