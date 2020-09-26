import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class MarcasListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.marca.idMarca}</th>
        <td>{this.props.marca.marca}</td>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.marca.idMarca)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/marca/editar/${this.props.marca.idMarca}`}>
            <i className="fas fa-pen"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

class MarcasList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Marca</th>
                      <th scope="col">
                        <Link to="/marca/agregar" className="btn btn-outline-success">Agregar marca</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.marcas.map(marca => {
                return (
                    <MarcasListItem delete={this.props.delete} key={marca.idMarca} marca={marca} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default MarcasList;