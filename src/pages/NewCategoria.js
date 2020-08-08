import React from 'react';

import { Link } from 'react-router-dom';

import CategoriaMarcaForm from '../components/CategoriaMarcaForm';

import config from '../config/config';
const Swal = require('sweetalert2');

class NewCategoria extends React.Component {
    componentDidMount(){
		const adminUser = localStorage.getItem('administrador');
		if (adminUser === null) {
			this.props.history.push('/ingresar');
		}
	}
  state = {
    form: {
      descripcion: ''
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("descripcion", this.state.form.descripcion);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(`${config.url}/categoria`, requestOptions)
      .then(response => response.text())
      .then(resultado => {
        const result = JSON.parse(resultado);
        console.log(result);
        if (!result.ok) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.err.message
            })
        }

        Swal.fire(
            'Guardado exitoso',
            'Se guardó '+ result.categoria.descripcion + ' de manera exitosa!',
            'success'
        )

        this.props.history.push('/categorias');
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div> */}

        <div className="container mt-4 p-2">
            <Link to="/categorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
            <p className="text-center h3 mb-2">Agregar categoria</p>
            <CategoriaMarcaForm
            onChange={this.handleChange}
            formValues={this.state.form}
            onSubmit={this.handleSubmit}
            />
        </div>
      </React.Fragment>
    );
  }
}

export default NewCategoria;