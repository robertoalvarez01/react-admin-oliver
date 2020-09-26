import React from 'react';

import { Link } from 'react-router-dom';

import CategoriaForm from '../components/CategoriaForm';

import config from '../config/config';
const Swal = require('sweetalert2');

class NewCategoria extends React.Component {
    componentDidMount(){
		const adminUser = localStorage.getItem('administrador');
		if (adminUser === null) {
			this.props.history.push('/ingresar');
    }
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    try {
      var myHeaders = new Headers();
      myHeaders.append("token", administrador.token);

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch(`${config.url}/categoria` , requestOptions)
      .then(response => response.text())
      .then(result => {
          const categoriasRes = JSON.parse(result).categorias;
          this.setState({
              categorias:categoriasRes
          })
      })
      .catch(error => console.log('error', error));
    } catch (error) {
      
    }
	}
  state = {
    categorias: [],
    form: {
      descripcion: '',
      categoria: ''
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
    urlencoded.append("categoria", this.state.form.categoria);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(`${config.url}/subcategoria`, requestOptions)
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
        <CategoriaForm 
        onChange={this.handleChange}
        formValues={this.state.form}
        onSubmit={this.handleSubmit}/>
      </React.Fragment>
    );
  }
}

export default NewCategoria;