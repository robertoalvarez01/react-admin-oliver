import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import './style/Modal.css';

const Modal = (props) => {
    useEffect(() => {
        document.querySelector('.modal-dialog').classList.add('show');
    }, [])
    return (
        ReactDOM.createPortal(
            <div className="Modal">
                <div className="modal-dialog" id="body__modal_buscador">
                    <div className="modal-content">
                        {props.children}
                        <i onClick={props.closeModal} className="fas fa-times" style={{cursor:'pointer'}}></i>
                    </div>
                </div>
            </div>,document.getElementById('modal')
        )
    );
}
 
export default Modal;