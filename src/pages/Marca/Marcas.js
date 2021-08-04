import React from 'react';
import Loader from '../../components/Loader';
import MarcasList from '../../components/MarcasList';
import config from '../../config/config';
import {requestDelete,getData} from '../../helpers/helpers';
const Swal = require('sweetalert2');

class Marcas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error:null,
      loading:false
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      loading:true
    });
    this.getMarcas();
  }
    componentWillUnmount() {
    }
    
    async getMarcas(){
      try {
        const data = await getData(`${config.url}/marcas`);
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
    

  delete(id){
    Swal.fire({
      title: '¿Seguro quieres eliminar la marca?',
      text: "Puede que existan productos con esta marca, serán eliminados tambien",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await requestDelete(`${config.url}/marcas/delete/${id}`);
        Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>{
            window.location.assign('/marcas');
        })
      }
    })
  }

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <MarcasList marcas={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default Marcas;