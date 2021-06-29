import React from 'react';

import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

import MarcaForm from '../../components/MarcaForm';
import config from '../../config/config';
const Swal = require('sweetalert2');

class NewMarca extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false
      }
    }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading:true});
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    let myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    let data = new FormData(document.getElementById('formAgregarMarca'));
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
    fetch(`${config.url}/marca`,requestOptions).then(response => response.json()).then(resultado => {
      this.setState({loading:false});
      Swal.fire(
          'Guardado exitoso',
          'Se guardó '+ data.get('marca') + ' de manera exitosa!',
          'success'
      ).then(()=>(this.props.history.push('/marcas')))
    })
    .catch(error => console.log('error', error));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
            <Link to="/marcas" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
            <p className="text-center h3 mb-2">Agregar marca</p>
            <MarcaForm
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              loading={this.state.loading}
              accion="agregar"
            />
        </div>
      </React.Fragment>
    );
  }
}

export default NewMarca;