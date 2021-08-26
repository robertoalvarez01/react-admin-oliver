import React from 'react'

const ProductosOferta = (props) => {
    return (
        <table className="table text-center table-hover">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Subproducto</th>
                    <th scope="col">
                    </th>
                </tr>
            </thead>
            <tbody>
                { props.productos.map(prd=>(
                    <tr key={prd.id}>
                        <th scope="row">{prd.producto}</th>
                        <td>{prd.subProducto}</td>
                        <td>
                            <button className="btn btn-outline-danger mx-1" onClick={()=>props.onDelete(prd.id)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default ProductosOferta;