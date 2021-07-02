import React from 'react';
import './index.css';

const BotonCircle = (props) => {

    const navegar = (link) => {
        window.location.assign(link);
    }

    return (
        <button type="button" className={`${props.color} animated fadeIn my-2`} id="btn__circle" onClick={props.link ? ()=>navegar(props.link) : props.action}>
            {props.icon ? <i className={props.icon}></i> : null}
            {props.value}
        </button>
    );
}
 
export default BotonCircle;