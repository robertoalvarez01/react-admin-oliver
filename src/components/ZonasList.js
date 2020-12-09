import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ZonasListItem extends React.Component {
    render() {
      return (
        <tr>
          <th scope="row">{this.props.zona.zona}</th>
          <td>{this.props.zona.dia}</td>
          <td>
            <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.zona.idZona)}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <Link className="btn btn-outline-warning mx-1" to={`/zonas-envio/editar/${this.props.zona.idZona}`}>
              <i className="fas fa-pen"></i>
            </Link>
          </td>
        </tr>
      );
    }
}
  
export default class ZonasList extends Component {
    render() {
        return (
            <div className="container mt-3">
                <table className="table text-center table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Zona</th>
                            <th scope="col">Día de envío</th>
                            <th scope="col">
                                <Link to="/zonas-envio/agregar" className="btn btn-outline-success">Agregar zona</Link>
                            </th>
                        </tr>
                    </thead>
                <tbody>
                {this.props.zonas.map(zona => {
                    return (
                        <ZonasListItem delete={this.props.delete} key={zona.idZona} zona={zona} />
                    );
                })}
                </tbody>
                </table>
            </div>
        )
    }
}
