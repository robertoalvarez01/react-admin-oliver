import React from 'react';

const MediosDePagoList = (props) => {
    return (
        (props.error)?<div className="alert alert-danger container">{props.error.message}</div>:
        <div className="container mt-3">
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">Medio</th>
                      <th scope="col">Estado</th>
                      <th scope="col">
                        <button onClick={props.nuevoMedio} className="btn btn-outline-success">Nuevo Medio</button>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {props.mediosDePago.map(medio => {
                return (
                    <tr key={medio.idMedioPago}>
                        <th scope="row">{medio.medio}</th>
                        <td>{medio.habilitado}</td>
                        <td>
                        <button className="btn btn-outline-danger mx-1" onClick={()=>props.delete(medio.idMedioPago)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        <button className="btn btn-outline-warning mx-1" onClick={()=>props.mostrarDetalle(medio)}>
                            <i className="fas fa-pen"></i>
                        </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    );
}
 
export default MediosDePagoList;