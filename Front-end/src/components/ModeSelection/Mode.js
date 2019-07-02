import React from 'react';
import './Mode.css';

const Mode = props => {

    const checked = { opacity: "1", padding: "5px", transitionDuration: "0.3s"};   
    const unchecked = { opacity: ".5", padding: "5px", transitionDuration: "0.3s" };
    const path = process.env.PUBLIC_URL + '/modes/' + props.name + '.svg'  
    // console.log(path)
    // for (var i = 0; ){

    // }
    return <div onClick={props.handleSelection}  style={props.selected ? checked : unchecked}>
        <img
            src={path}
            alt={props.name} 
            style={props.grouped ? {maxHeight: props.maxHeight}: {maxHeight: props.maxHeight, cursor: "pointer"}} 
        
        />
        <h4 style={{ textAlign: "center" }}>
            {props.name}
        </h4>
    </div>

}
export default Mode; 