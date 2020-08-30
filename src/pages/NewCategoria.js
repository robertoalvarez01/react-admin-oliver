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
        {/* <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div> */}

        <div className="container mt-4 p-2">
            <Link to="/categorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
            <p className="text-center h3 mb-2">Agregar categoria</p>
            <div className="container bg-light border rounded p-4"> 
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Descripción: (obligatorio)</label>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    type="text"
                    name="descripcion"
                    value={this.state.form.descripcion}
                  />
                </div>

                <div className="form-group">
                  <label>Categoria Padre: (obligatorio)</label>
                  <select
                    onChange={this.handleChange}
                    className="form-control"
                    name="categoria"
                    value={this.state.form.categoria}
                  >
                  <option value="none" hidden>Select an Option</option>
                  {this.state.categorias.map(categoria => {
                      return <option key={categoria._id} value={categoria._id}>{categoria.descripcion}</option>
                  })}
                  </select>
                </div>
                <button type="submit" className="btn btn-outline-success btn-block">
                  Guardar
                </button>
              </form>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewCategoria;