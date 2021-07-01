import React from 'react';
import './index.css';

const BotonCircle = (props) => {
    return (
        <button type="button" className={`${props.color} animated fadeIn my-2`} id="btn__circle">
            {props.icon ? <i className={props.icon}></i> : null}
            {props.value}
        </button>
    );
}
 
export default BotonCircle;