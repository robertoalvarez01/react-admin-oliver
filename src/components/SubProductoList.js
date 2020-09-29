import React from 'react';
import { Link } from 'react-router-dom';

class SubProductoListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.subproducto.subProducto}</th>
        <td>{this.props.subproducto.producto}</td>
        <th scope="row">{this.props.subproducto.tamaño}</th>
        <td>{this.props.subproducto.peso}</td>
        <th scope="row">{this.props.subproducto.stock}</th>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.subproducto.idSubProducto)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/subproducto/editar/${this.props.subproducto.idSubProducto}`}>
            <i className="fas fa-pen"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

class SubProductoList extends React.Component {
  render() {
    return (
        <div className="container mt-3" style={{'height':'80vh','overflowY':'scroll'}}>
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">SubProducto</th>
                      <th scope="col">Producto referente</th>
                      <th scope="col">Tamaño</th>
                      <th scope="col">Peso</th>
                      <th scope="col">Stock</th>
                      <th scope="col">
                        <Link to="/subproducto/agregar" className="btn btn-outline-success">Agregar subproducto</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.subproductos.map(subproducto => {
                return (
                    <SubProductoListItem key={subproducto.idSubProducto} subproducto={subproducto} delete={this.props.delete} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default SubProductoList;