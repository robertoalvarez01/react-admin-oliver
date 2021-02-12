import React from 'react';
import { Link } from 'react-router-dom';
import {authentication} from '../../helpers/helpers';
import config from '../../config/config';
import Loader from '../../components/Loader';
import ZonaForm from '../../components/ZonaForm';
const Swal = require('sweetalert2');

class NewZona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error:null,
      formValues:{
        zona:'',
        dia:''
      }
    }
  }
  
  componentDidMount(){
    authentication();
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
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
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state.formValues),
            headers:myHeaders
        };
        fetch(`${config.url}/zona`, requestOptions)
        .then(response => response.json())
        .then(resultado => {
            this.setState({...this.state,loading:false});
            if (!resultado.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resultado.data.info
                });
            }
            Swal.fire(
                'Guardado exitoso',
                'Se guardó la zona de manera exitosa!',
                'success'
            ).then(()=>this.props.history.push('/zonas-envio'));
        })
        .catch(error => console.log('error', error));
    };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
              <Link to="/zonas-envio" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Agregar Zona</p>
              <ZonaForm 
              onChange={this.handleChange}
              formValues={this.state.formValues}
              onSubmit={this.handleSubmit}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NewZona;