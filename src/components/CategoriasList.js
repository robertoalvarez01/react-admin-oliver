import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class CategoriasListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.categoria.idCategoria}</th>
        <td>{this.props.categoria.categoria}</td>
        <td>Editar - Eliminar</td>
      </tr>
    );
  }
}

class CategoriasList extends React.Component {
  render() {
    return (
        <div className="mx-3 mt-3">
            <div>
                <Link to="/categoria/agregar" className="btn btn-outline-success float-right mb-2">Agregar categoria</Link>
                <Link to="/" className="btn btn-outline-danger float-right mb-2 mr-2">Volver al inicio</Link>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
            <tbody>
            {this.props.categorias.map(categoria => {
                return (
                    <CategoriasListItem key={categoria.idCategoria} categoria={categoria} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default CategoriasList;