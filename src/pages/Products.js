import React from 'react';
import Loader from '../components/Loader';
import ProductList from "../components/ProductList";
import config from '../config/config';
import {authentication,requestDelete,getData} from '../helpers/helpers';
const Swal = require('sweetalert2');

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading:false,
      error:null,
      desde:1,
      limite:50
    };
  }

  componentDidMount() {
    this.setState({...this.state,loading:true});
    authentication();
    this.getProductos();
  }

  async getProductos(){
    try {
      const data = await getData(`${config.url}/producto?desde=${this.state.desde}&limite=${this.state.limite}`);
      this.setState({...this.state,data:data.data,loading:false});
    } catch (error) {
      this.setState({...this.state,error,loading:false})
    }
  }

  delete(id){
    Swal.fire({
      title: '¿Seguro quieres eliminar el producto?',
      text: "Este producto hace referencia a otros subproductos, de eliminarlos se eliminarán los subproductos tambien",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await requestDelete(`${config.url}/producto/${id}`);
        Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>{
            window.location.assign('/productos');
        })
      }
    })
  }

  async cargarMas(){
    return new Promise((resolve,reject)=>{
      this.setState({
        ...this.state,
        desde:this.state.desde+49
      });
      resolve();
    }).then(()=>{
      this.getProductos();
    })
  }

  async buscarProducto(event){
    try {
      let key = event.target.value;
      if(key.length===0) return this.cargarMas();
      if(key.length<3) return;
      const data = await getData(`${config.url}/productos/buscar?busqueda=${key}`);
      this.setState({
        ...this.state,
        data:data.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <div className="container pt-3">
          <input type="text" className="form-control d-none" id="buscador" onChange={this.buscarProducto.bind(this)} placeholder="Ingrese el nombre del producto"/>
        </div>
        <ProductList products={this.state.data} delete={this.delete}/>
        <div className="text-center">
          <button className="btn btn-info mt-3 mx-2" onClick={()=>this.cargarMas(this.state.desde,this.state.limite)}>Ver más</button>
          <button className="btn btn-warning mt-3 mx-2" onClick={()=>document.getElementById('buscador').classList.toggle('d-none')}>Buscar</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;