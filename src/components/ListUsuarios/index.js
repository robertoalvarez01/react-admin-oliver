import React from 'react';
import './index.css';

const ListUsuarios = (props) => {
    return (
        <div className="lista__usuarios">
            <div className="d-flex align-items-center justify-content-between">
                <h3>{props.titulo}</h3>
                {props.btnReload ? <i className="fas fa-redo-alt" id="btnReload" onClick={props.reload}></i> : null}
            </div>
            <section className="lista__body">
                {props.children}
            </section>
        </div>
    );
}
 
export default ListUsuarios;