import React from 'react';
import './style/DetalleVenta.css';

const DetalleVenta = (props) => {
    return (
        <div className="detalleVenta container">
            <section className="datosComprador mb-2">
                <img className="fotoUsuario mr-3" src={(props.data.foto!='null')?props.data.foto:`https://storage.googleapis.com/web-oliver/user-default.png`} alt={props.data.nombre}/>
                <p>{props.data.nombre}</p>
            </section>
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
                <li>
                    <p className="text-muted">Medio de pago: <span>{props.data.medio}</span></p>
                </li>
                <li>
                    <p className="text-muted">Pagado: <span>SI</span></p>
                </li>
            </ul>
            <h3>Productos de la venta:</h3>
            <table className="table table-hover text-center">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col" className="d-none">Producto</th>
                    <th scope="col">Sub Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Foto</th>
                    </tr>
                </thead>
                <tbody>
                {props.data.productos.map((prd,key) => {
                    return (
                        <tr key={key}>
                            <th scope="row" className="d-none">{prd.producto}</th>
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