import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ProductForm from '../../components/ProductForm';
import config from '../../config/config';
import {getData} from '../../helpers/helpers';
const Swal = require('sweetalert2');

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      formValues:{
        producto: '',
        precioUnidad: '',
        descripcion: '',
        descripcionBasica: '',
        mostrar: 0,
        idCategoria: 0,
        idMarca: 0,
        idSubCategoria:0
      },
      loading:false,
      error:null,
      categorias:[],
      subCategorias:[],
      marcas:[]
    }
  }

  async componentDidMount(){
    try {
      this.setState({
        ...this.state,
        loading:true
      });
      await this.getCategorias();
      await this.getSubCategorias();
      await this.getMarcas();
    } catch (error) {
      this.setState({
        ...this.state,
        error,
        loading:false
      })
    } 
  }
  
  async getCategorias(){
    try {
      const categorias = await getData(`${config.url}/categorias`);
      return this.setState({
        ...this.state,
        categorias:categorias.data,
        formValues:{
          ...this.state.formValues,
          idCategoria:categorias.data[0].idCategoria
        }
      })
    } catch (error) {
      this.setState({
        ...this.state,
        error,
        loading:false
      })
    }
  }

  async getSubCategorias(){
    try {
      const subCategorias = await getData(`${config.url}/subcategorias`);
      return this.setState({
        ...this.state,
        subCategorias:subCategorias.data,
        formValues:{
          ...this.state.formValues,
          idSubCategoria:subCategorias.data[0].idSubCategoria
        }
      })
    } catch (error) {
      this.setState({
        ...this.state,
        error,
        loading:false
      })
    }
  }

  async getMarcas(){
    try {
      const marcas = await getData(`${config.url}/marcas`);
      return this.setState({
        ...this.state,
        marcas:marcas.data,
        formValues:{
          ...this.state.formValues,
          idMarca:marcas.data[0].idMarca
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
        ...this.state.formValues,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({...this.state,loading:true});
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(this.state.formValues),
      redirect: 'follow'
    };
    
    fetch(`${config.url}/productos/add`, requestOptions)
      .then(response => response.json())
      .then(resultado => {
        this.setState({...this.state,loading:false});
        if (resultado.info.code) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resultado.info.code
            })
        }
        Swal.fire(
            'Guardado exitoso',
            'Se guardó el producto de manera exitosa!',
            'success'
        ).then(()=>this.props.history.push('/productos'));
      })
      .catch(error => this.setState({...this.state,error,loading:false}));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
            <div className="row justify-content-between px-3">
              <p className="text-center h3 mb-2">Agregar producto</p>
              <Link to="/productos" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
            </div>
            <ProductForm
              onChange={this.handleChange}
              formValues={this.state.formValues}
              categorias={this.state.categorias}
              subCategorias={this.state.subCategorias}
              marcas={this.state.marcas}
              onSubmit={this.handleSubmit}
            />
        </div>
      </React.Fragment>
    );
  }
}

export default NewProduct;