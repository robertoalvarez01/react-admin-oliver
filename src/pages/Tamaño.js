import React from 'react';
import TamañosList from '../components/TamañosList';
import Loader from '../components/Loader';
import config from '../config/config'
import {authentication,requestDelete,getData} from '../helpers/helpers';
const Swal = require('sweetalert2');

class Tamaño extends React.Component {
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
    this.getTamaños();
  }
  
  async getTamaños(){
    try {
      const data = await getData(`${config.url}/tamaños`);
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
      title: '¿Seguro quieres eliminar el tamaño?',
      text: "Puede que existan productos con este tamaño, serán eliminados tambien",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await requestDelete(`${config.url}/tamaño/${id}`);
        return Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>window.location.assign('/tamaños'));
      }
    });
  }

  componentWillUnmount() {
  }


  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <TamañosList tamaños={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default Tamaño;