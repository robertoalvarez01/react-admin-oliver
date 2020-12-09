import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class LegalesListItem extends React.Component {
  render() {
    return (
      <tr>
        <th  scope="row">{(this.props.legales.terminos_condiciones.length>30)?this.props.legales.terminos_condiciones.substring(0,27)+'...':this.props.legales.terminos_condiciones}</th>
        <td>{(this.props.legales.politica_privacidad.length>30)?this.props.legales.politica_privacidad.substring(0,27)+'...':this.props.legales.politica_privacidad}</td>
      </tr>
    );
  }
}

class LegalesList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">Legales</th>
                      <th scope="col">Política</th>
                      <th scope="col">
                        <Link to="/legales/editar" className="btn btn-outline-success">Modifcar</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.legales.map((data,key) => {
                return (
                    <LegalesListItem key={key} legales={data} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default LegalesList;