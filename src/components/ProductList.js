import React from 'react';
import { Link } from 'react-router-dom';

class ProductListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.producto.producto}</th>
        <td>{this.props.producto.marca}</td>
        <td>{this.props.producto.categoria}</td>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.producto.idProducto)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/producto/editar/${this.props.producto.idProducto}`}>
            <i className="fas fa-pen"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

class ProductList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table table-hover text-center">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">Producto</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">
                        <Link to="/producto/agregar" className="btn btn-outline-success">Agregar producto</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.products.map(product => {
                return (
                    <ProductListItem key={product.idProducto} producto={product} delete={this.props.delete}/>
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default ProductList;