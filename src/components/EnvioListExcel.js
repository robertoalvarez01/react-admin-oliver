import React from 'react';
const EnvioListExcel = (props) => {
    return (
        <table id="table-envios-excel" className="d-none">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Código envío</th>
                    <th scope="col">Zona</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((envio,key)=>(
                    <tr key={key}>
                        <td>{envio.idEnvio}</td>
                        <td>{envio.zona}</td>
                        <td>{envio.tipo}</td>
                        <td>{envio.venta.nombre}</td>
                        <td>{envio.venta.address}</td>
                        <td>{envio.venta.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default EnvioListExcel;