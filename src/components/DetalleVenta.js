import React from 'react';
import './style/DetalleVenta.css';

const DetalleVenta = (props) => {
    return (
        <div className="detalleVenta">
            <h3>Datos de Comprador:</h3>
            <ul>
                <li>
                    <p className="text-muted">Dirección: <span className="">{props.data.address}</span> <a href={`https://maps.google.com/?q=${props.data.lat},${props.data.lon}`} target="blank">(Ver residencia)</a></p>
                </li>
                <li>
                    <p className="text-muted">Email: <span className="">{props.data.email}</span></p>
                </li>
            </ul>
            <h3>Datos de venta:</h3>
            <ul>
                <li>
                    <p className="text-muted">Total: $<span className="">{props.data.subtotal}</span></p>
                </li>
                <li>
                    <p className="text-muted">Descuento: <span className="">{props.data.descuento}</span></p>
                </li>
            </ul>
            <h3>Productos de la venta:</h3>
            <table className="table table-hover text-center">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Sub Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Foto</th>
                    </tr>
                </thead>
                <tbody>
                {props.data.productos.map((prd,key) => {
                    return (
                        <tr key={key}>
                            <th scope="row">{prd.producto}</th>
                            <td>{prd.subProducto}</td>
                            <td>{prd.cantidad}</td>
                            <td><img src={prd.foto} style={{width:'50px'}} alt={prd.subProducto}/></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
 
export default DetalleVenta;