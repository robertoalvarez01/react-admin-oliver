import React from 'react';
import { Link } from 'react-router-dom';
import {authentication,getData} from '../helpers/helpers';
import SubCategoriaForm from '../components/SubCategoriaForm';
import config from '../config/config';
import Loader from '../components/Loader';
const Swal = require('sweetalert2');

class NewSubCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error:null,
      categorias:[],
      formValues:{
        subcategoria:'',
        idCategoria:null
      }
    }
  }
  
  componentDidMount(){
    authentication();
    this.setState({
        ...this.state,
        loading:true
    })
    this.getCategorias();
  }

  async getCategorias(){
    try {
        const data = await getData(`${config.url}/categorias`);
        this.setState({
            ...this.state,
            formValues:{
                subcategoria:'',
                idCategoria:data.data[0].idCategoria
            },
            categorias:data.data,
            loading:false
        });
    } catch (error) {
        this.setState({
            ...this.state,
            loading:false,
            error
        })
    }
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
    fetch(`${config.url}/subcategoria`, requestOptions)
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
            'Se guardó la subcategoria de manera exitosa!',
            'success'
        ).then(()=>this.props.history.push('/subcategorias'));
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
              <Link to="/subcategorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Agregar subcategoria</p>
              <SubCategoriaForm
              categorias={this.state.categorias} 
              onChange={this.handleChange}
              formValues={this.state.formValues}
              onSubmit={this.handleSubmit}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NewSubCategoria;