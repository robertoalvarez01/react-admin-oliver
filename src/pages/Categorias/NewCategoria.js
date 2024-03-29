import React from 'react';
import { Link } from 'react-router-dom';
import CategoriaForm from '../../components/CategoriaForm';
import config from '../../config/config';
import Loader from '../../components/Loader';
const Swal = require('sweetalert2');

class NewCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error:null,
      formValues:{
        categoria:''
      }
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      formValues: {
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({...this.state,loading:true});
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    let myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    let requestOptions = {
      method: 'POST',
      body: new FormData(document.getElementById('form-categoria')),
      headers:myHeaders
    };
    fetch(`${config.url}/categorias/add`, requestOptions)
      .then(response => response.json())
      .then(resultado => {
        this.setState({...this.state,loading:false});
        if (resultado.error) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resultado.error
            });
        }
        Swal.fire(
            'Guardado exitoso',
            'Se guardó la categoria de manera exitosa!',
            'success'
        ).then(()=>this.props.history.push('/categorias'));
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
              <Link to="/categorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Agregar categoria</p>
              <CategoriaForm
              add={true} 
              onChange={this.handleChange}
              formValues={this.state.formValues}
              onSubmit={this.handleSubmit}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NewCategoria;