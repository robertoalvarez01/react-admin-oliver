import React from 'react';
import { Link } from 'react-router-dom';
import {getData} from '../../helpers/helpers';
import TamañoForm from '../../components/TamañoForm';
import config from '../../config/config';
import Loader from '../../components/Loader';
const Swal = require('sweetalert2');

class NewTamaño extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error:null,
      formValues:{
        tamaño:''
      }
    }
  }
  
  componentDidMount(){
    this.setState({...this.state,loading:true});
    this.getTamaño();
  }

  async getTamaño(){
    try {
      const data = await getData(`${config.url}/tamaños/${this.props.match.params.id}`);
      this.setState({
        ...this.state,
        formValues:{
          tamaño:data.data[0].tamaño
        },
        loading:false
      })
    } catch (error) {
      this.setState({
        ...this.state,
        error,
        loading:false
      })
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
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'PUT',
      body: JSON.stringify(this.state.formValues),
      headers:myHeaders
    };
    fetch(`${config.url}/tamaños/update/${this.props.match.params.id}`, requestOptions)
      .then(response => response.json())
      .then(resultado => {
        this.setState({...this.state,loading:false});
        if (resultado.info.code) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resultado.info.code
            });
        }
        Swal.fire(
            'Guardado exitoso',
            'Se modificó el tamaño de manera exitosa!',
            'success'
        ).then(()=>this.props.history.push('/tamaños'));
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
              <Link to="/tamaños" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Modificar Tamaño</p>
              <TamañoForm 
              onChange={this.handleChange}
              formValues={this.state.formValues}
              onSubmit={this.handleSubmit}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NewTamaño;