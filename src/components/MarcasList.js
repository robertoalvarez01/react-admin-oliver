import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class MarcasListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.marca.idMarca}</th>
        <td>{this.props.marca.marca}</td>
        <td>Editar - Eliminar</td>
      </tr>
    );
  }
}

class MarcasList extends React.Component {
  render() {
    return (
        <div className="mx-3 mt-3">
            <div>
                <Link to="/marca/agregar" className="btn btn-outline-success float-right mb-2">Agregar marca</Link>
                <Link to="/" className="btn btn-outline-danger float-right mb-2 mr-2">Volver al inicio</Link>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
            <tbody>
            {this.props.marcas.map(marca => {
                return (
                    <MarcasListItem key={marca.idMarca} marca={marca} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default MarcasList;