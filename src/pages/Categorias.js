import React from 'react';
import CategoriasList from '../components/CategoriasList';
import Loader from '../components/Loader';
import config from '../config/config'
import {authentication,requestDelete,getData} from '../helpers/helpers';
const Swal = require('sweetalert2');

class Categorias extends React.Component {
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
    this.getCategorias();
  }
  
  async getCategorias(){
    try {
      const data = await getData(`${config.url}/categorias`);
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
      title: '¿Seguro quieres eliminar la categoría?',
      text: "Puede que existan productos con esta categoria, serán eliminados tambien",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await requestDelete(`${config.url}/categoria/${id}`);
        return Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>window.location.assign('/categorias'));
      }
    });
  }

  componentWillUnmount() {
  }


  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <CategoriasList categorias={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default Categorias;