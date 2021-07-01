import React from 'react';
import './index.css';

const BoxBalance = (props) => {
    return (
        <div className="box__balance animated fadeIn">
            {props.avatar ? 
                <div className="box__avatar">
                    <img src={props.avatar} alt="Profile" className="img-fluid"/>
                </div>
            : 
                <div className="box__icon">
                    <i className={props.icon}/>
                </div>
            }
            <div className="box__data">
                <h4>{props.valor}</h4>
                <span className="text-muted">{props.label}</span>
            </div>
            {props.detalle ? <div className={`box__detalle ${props.colorDetalle ? props.colorDetalle : ''}`}>
                <i className={props.iconDetalle}></i> {props.detalle}
            </div> : null}
        </div>
    );
}
 
export default BoxBalance;