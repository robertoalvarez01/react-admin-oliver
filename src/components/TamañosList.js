import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class TamañoListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.tamaño.idTamaño}</th>
        <td>{this.props.tamaño.tamaño}</td>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.tamaño.idTamaño)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/tamaño/editar/${this.props.tamaño.idTamaño}`}>
            <i className="fas fa-pen"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

class TamañosList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Tamaño</th>
                      <th scope="col">
                        <Link to="/tamaño/agregar" className="btn btn-outline-success">Agregar tamaño</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.tamaños.map(tm => {
                return (
                    <TamañoListItem key={tm.idTamaño} tamaño={tm} delete={this.props.delete} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default TamañosList;