import React from 'react';
import { Link } from 'react-router-dom';
import {getData} from '../../helpers/helpers';
import SubProductoForm from '../../components/SubProductoForm';
import config from '../../config/config';
import Loader from '../../components/Loader';
const Swal = require('sweetalert2');

class NewSubProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error:null,
      productos:[],
      tamaños:[],
      formValues:{
        subProducto:'',
        codigoBarra:'',
        idProducto:'',
        producto:'',
        stock:'',
        minStock:'',
        peso:'',
        idTamaño:'',
        precioUnidad:'',
        foto:'',
        mostrar:0,
        descuento:0
      }
    }
  }
  
  async componentDidMount(){
    try {
      this.setState({
          ...this.state,
          loading:true
      })
      await this.getProductos();
      await this.getTamaños();
    } catch (error) {
      this.setState({
        ...this.state,
        loading:false,
        error
      })
    }
  }

  async getProductos(){
    try {
      const data = await getData(`${config.url}/productos?desde=1&limite=500`);
      this.setState({...this.state,productos:data.data});
    } catch (error) {
      this.setState({...this.state,error,loading:false})
    }
  }

  async getTamaños(){
    try {
        const data = await getData(`${config.url}/tamaños`);
        this.setState({
            ...this.state,
            tamaños:data.data,
            loading:false,
            formValues:{
              ...this.state.formValues,
              idTamaño:data.data[0].idTamaño
            }
        });
    } catch (error) {
        this.setState({
            ...this.state,
            loading:false,
            error
        })
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({...this.state,loading:true});
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    let myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    let requestOptions = {
      method: 'POST',
      body: new FormData(document.getElementById('formAgregarSubProducto')),
      headers:myHeaders
    };
    const res = await fetch(`${config.url}/subproductos/add`, requestOptions);
    const response = await res.json();
    console.log(response);
    if(res.status != 200){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.error
      });
    }
    Swal.fire(
        'Guardado exitoso',
        'Se guardó el subproducto de manera exitosa!',
        'success'
    ).then(()=>this.props.history.push('/subproductos'));
  };

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container mt-4 p-2">
            <div className="row justify-content-between px-3">
              <p className="text-center h3 mb-2">Nuevo subproducto</p>
              <Link to="/subproductos" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
            </div>
              <SubProductoForm
              formId="formAgregarSubProducto"
              productos={this.state.productos}
              tamaños={this.state.tamaños} 
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              formValues={this.state.formValues}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NewSubProducto;