import React from 'react';
import { Link } from 'react-router-dom';
import ProductForm from '../../components/ProductForm';
import Loader from '../../components/Loader';
import config from '../../config/config';
import {getData} from '../../helpers/helpers';
const Swal = require('sweetalert2');

class EditProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      formValues:{
        producto: '',
        precioUnidad: '',
        descripcion: '',
        descripcionBasica: '',
        mostrar: 1,
        idCategoria: 0,
        idMarca: 0,
        idSubCategoria:0
      },
      loading:false,
      error:null,
      categorias:[],
      marcas:[],
      subCategorias:[]
    }
  }

  async componentDidMount(){
    try {
      this.setState({
        ...this.state,
        loading:true
      });
      await this.getProducto();
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

  async getProducto(){
    try {
      const producto = await getData(`${config.url}/productos/${this.props.match.params.productId}`);
      return this.setState({
        ...this.state,
        formValues:{
          producto: producto.data[0].producto,
          precioUnidad: producto.data[0].precioUnidad,
          descripcion: producto.data[0].descripcion,
          descripcionBasica: producto.data[0].descripcion_basica,
          mostrar: producto.data[0].mostrar,
          idCategoria: producto.data[0].idCategoria,
          idMarca: producto.data[0].idMarca,
          idSubCategoria:producto.data[0].idSubCategoria
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

  async getCategorias(){
    try {
      const categorias = await getData(`${config.url}/categorias`);
      return this.setState({
        ...this.state,
        categorias:categorias.data
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
        subCategorias:subCategorias.data
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

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      loading:true
    })
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    console.log(this.state);
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(this.state.formValues)
    };

    const res = await fetch(`${config.url}/productos/update/${this.props.match.params.productId}`, requestOptions);
    if(res.status!=200){
      return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al modificar el producto'
      });  
    }
    Swal.fire(
        'Guardado exitoso',
        'Se modificó el producto de manera exitosa!',
        'success'
    ).then(()=>this.props.history.push('/productos'));
  };
  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        {/* <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div> */}

        <div className="container mt-4 p-2">
            <div className="row justify-content-between px-3">
              <p className="text-center h3 mb-2">Editar producto</p>
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

export default EditProduct;