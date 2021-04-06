import React from 'react';
import { Link } from 'react-router-dom';
import {authentication} from '../../helpers/helpers';
import config from '../../config/config';
import Loader from '../../components/Loader';
import BannerForm from '../../components/BannerForm';
const Swal = require('sweetalert2');

class NewBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error:null,
      formValues:{
        descripcion:'',
        activo:0
      }
    }
  }
  
  componentDidMount(){
    authentication();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({...this.state,loading:true});
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    let myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    let requestOptions = {
      method: 'POST',
      body: new FormData(document.getElementById('form-banner')),
      headers:myHeaders
    };
    fetch(`${config.url}/banner`, requestOptions)
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
            'Se guardó el banner de manera exitosa!',
            'success'
        ).then(()=>this.props.history.push('/banners'));
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
              <Link to="/banners" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Agregar banner</p>
              <BannerForm
              add={true} 
              onChange={this.handleChange}
              formValues={this.state.formValues}
              onSubmit={this.handleSubmit}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NewBanner;