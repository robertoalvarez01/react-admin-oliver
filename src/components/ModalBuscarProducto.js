import React, { useEffect, useState } from 'react';
import Modal from './Modal';
const ModalBuscarProducto = (props) => {
    useEffect(() => {
        setFiltrados(props.productos);
    }, [])
    const [filtrados, setFiltrados] = useState([]);

    const buscarProducto = event=>{
        let key = event.target.value.toLowerCase();
        let prdfiltrados = props.productos.filter(prd=>prd.producto.toLowerCase().includes(key));
        setFiltrados(prdfiltrados);
    }

    return (
        <Modal closeModal={props.closeModal}>
            <h4 className="text-center">Buscá el producto padre</h4>
            <div className="col-12 my-2">
                <input type="text" onChange={buscarProducto} className="form-control" placeholder="Nombre del producto"/>
            </div>
            <h6 className="my-2 mx-4">Resultados:</h6>
            <div className="row mx-2">
                {filtrados.map(prd=>(
                <div className="col-12 col-md-6" key={prd.idProducto} style={{'cursor':'pointer'}} onClick={()=>props.setProductoPadre(prd.idProducto)}>
                    <div className="bg-light border rounded">
                    <p className="my-2 mx-2">{prd.producto} | {prd.marca} | {prd.categoria}</p>
                    </div>
                </div>
                ))}
            </div>
        </Modal>
    );
}
 
export default ModalBuscarProducto;