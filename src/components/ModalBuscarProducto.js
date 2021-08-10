import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import config from '../config/config';
import {getData} from '../helpers/helpers';
import Loader from './Loader';
const ModalBuscarProducto = (props) => {

    const [filtrados, setFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarProducto = async event=>{
        try {
            let key = event.target.value.toLowerCase();
            if(key.length<3) return;
            setLoading(true);
            const data = await getData(`${config.url}/productos/buscar?busqueda=${key}`);
            console.log(data);
            setFiltrados(data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }

    }

    return (
        <Modal closeModal={props.closeModal}>
            <h4 className="text-center">Buscá el producto padre</h4>
            <div className="col-12 my-2">
                <input type="text" onChange={buscarProducto} className="form-control" placeholder="Nombre del producto"/>
            </div>
            <h6 className="my-2 mx-4">Resultados:</h6>
            <div className="row mx-2">
                {(loading)?
                    <div className="text-center" style={{width:'100%'}}><Loader/></div>
                :
                    filtrados.map(prd=>(
                    <div className="col-12 col-md-6" key={prd.idProducto} style={{'cursor':'pointer'}} onClick={()=>props.setProductoPadre(prd.idProducto,`${prd.producto}`)}>
                        <div className="bg-light border rounded">
                            <p className="my-2 mx-2">{prd.producto} | {prd.marca} | {prd.categoria}</p>
                        </div>
                    </div>
                    ))
                }
            </div>
        </Modal>
    );
}
 
export default ModalBuscarProducto;