import React from 'react';
import './index.css';

const BoxBalance = (props) => {
    return (
        <div className="box__balance animated fadeIn">
            <div className="box__icon">
                <i className={props.icon}/>
            </div>
            <div className="box__data">
                <h4>{props.valor}</h4>
                <span className="text-muted">{props.label}</span>
            </div>
        </div>
    );
}
 
export default BoxBalance;