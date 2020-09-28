import React from 'react';
import SubProductoList from '../components/SubProductoList';
import Loader from '../components/Loader';
import config from '../config/config'
import {authentication,requestDelete,getData} from '../helpers/helpers';
const Swal = require('sweetalert2');

class SubProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error:null,
      loading:false
    };
  }

  componentDidMount() {
    authentication();
    this.setState({
      ...this.state,
      loading:true
    });
    this.getSubProducto();
  }
  
  async getSubProducto(){
    try {
      const data = await getData(`${config.url}/subproducto`);
      this.setState({
        ...this.state,
        data:data.data,
        loading:false
      });
    } catch (error) {
      this.setState({
        ...this.state,
        loading:false,
        error
      });
    }
  }

  async delete(id){
    await Swal.fire({
      title: '¿Seguro quieres eliminar el recurso?',
      text: "Esta accción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await requestDelete(`${config.url}/subproducto/${id}`);
        return Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>window.location.assign('/subproductos'));
      }
    });
  }

  componentWillUnmount() {
  }


  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <SubProductoList subproductos={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default SubProductos;