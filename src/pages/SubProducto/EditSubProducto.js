import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {getData} from '../../helpers/helpers';
import config from '../../config/config';
import SubProductoForm from '../../components/SubProductoForm';
const Swal = require('sweetalert2');

class EditSubCategoria extends React.Component {
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
          idProducto:0,
          producto:'',
          stock:0,
          minStock:0,
          peso:'0',
          idTamaño:0,
          precioUnidad:0,
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
            await this.getSubProducto();
            await this.getTamaños();
        } catch (error) {
          this.setState({
            ...this.state,
            loading:false,
            error
          })
        }
    }

    async getSubProducto(){
        try {
            const data = await getData(`${config.url}/subproductos/${this.props.match.params.id}`);
            return this.setState({
                ...this.state,
                formValues:{
                  subProducto:data.data[0].subProducto,
                  codigoBarra:data.data[0].codigoBarra,
                  idProducto:data.data[0].idProducto,
                  producto:data.data[0].producto,
                  stock:data.data[0].stock,
                  minStock:data.data[0].minStock,
                  peso:data.data[0].peso,
                  idTamaño:data.data[0].idTamaño,
                  precioUnidad:data.data[0].precioUnidad,
                  foto:data.data[0].foto,
                  mostrar:data.data[0].mostrar,
                  descuento:data.data[0].descuento
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
  
    handleSubmit = async e => {
      e.preventDefault();
      this.setState({...this.state,loading:true});
      const administrador = JSON.parse(localStorage.getItem('administrador'));
      let myHeaders = new Headers();
      myHeaders.append("token", administrador.token);
      const data = new FormData(document.getElementById('formModificarSubProducto'));
      let requestOptions = {
        method: 'PUT',
        body: data,
        headers:myHeaders
      };
      const res = await fetch(`${config.url}/subproductos/update/${this.props.match.params.id}`, requestOptions);
      if(res.status!=200){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al modificar el subproducto'
        });
      }
      Swal.fire(
          'Guardado exitoso',
          'Se Modificó el subproducto de manera exitosa!',
          'success'
      ).then(()=>this.props.history.push('/subproductos'));
    };
  
    render() {
      return (
        (this.state.loading)?<Loader/>:
        <React.Fragment>
          <div className="container mt-4 p-2">
              <div className="row justify-content-between px-3">
                <p className="text-center h3 mb-2">Editar subproducto</p>
                <Link to="/subproductos" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              </div>
              <SubProductoForm
                formId="formModificarSubProducto"
                tamaños={this.state.tamaños} 
                onChange={this.handleChange}
                formValues={this.state.formValues}
                onSubmit={this.handleSubmit}/>
          </div>
        </React.Fragment>
      );
    }
}

export default EditSubCategoria;