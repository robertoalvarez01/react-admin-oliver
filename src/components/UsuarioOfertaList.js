import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
  return (
    <tr>
      <th scope="row">{props.user.id}</th>
      <td>{props.user.mail}</td>
    </tr>
  );
}

const UsuarioOfertaList = (props) => {
  return (
    <div className="container mt-3">
      <table className="table text-center table-hover">
        <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Mail</th>
              <th scope="col">
                <Link to="/nueva-novedad" className="btn btn-outline-success">Nueva novedad</Link>
              </th>
            </tr>
        </thead>
        <tbody>
        {props.usuarios.map(user => {
            return (
                <UserItem key={user.id} user={user} delete={props.delete} />
            );
        })}
        </tbody>
      </table>
    </div>
  );
}
 
export default UsuarioOfertaList;