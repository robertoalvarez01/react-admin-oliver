import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class CategoriasListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.categoria.idCategoria}</th>
        <td>{this.props.categoria.categoria}</td>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.categoria.idCategoria)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/categoria/editar/${this.props.categoria.idCategoria}`}>
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
                      <th scope="col">id</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">
                        <Link to="/categoria/agregar" className="btn btn-outline-success">Agregar categoria</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.categorias.map(categoria => {
                return (
                    <CategoriasListItem key={categoria.idCategoria} categoria={categoria} delete={this.props.delete} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default CategoriasList;