import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class CategoriasListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.subcategoria.idSubCategoria}</th>
        <td>{this.props.subcategoria.subcategoria}</td>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.subcategoria.idSubCategoria)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/subcategoria/editar/${this.props.subcategoria.idSubCategoria}`}>
            <i className="fas fa-pen"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

class CategoriasList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">SubCategoria</th>
                      <th scope="col">
                        <Link to="/subcategoria/agregar" className="btn btn-outline-success">Agregar subcategoria</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.subcategorias.map(subcategoria => {
                return (
                    <CategoriasListItem key={subcategoria.idSubCategoria} subcategoria={subcategoria} delete={this.props.delete} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default CategoriasList;