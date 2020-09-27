import React from 'react';
import SubCategoriaList from '../components/SubCategoriaList';
import Loader from '../components/Loader';
import config from '../config/config'
import {authentication,requestDelete,getData} from '../helpers/helpers';
const Swal = require('sweetalert2');

class SubCategorias extends React.Component {
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
    this.getSubCategorias();
  }
  
  async getSubCategorias(){
    try {
      const data = await getData(`${config.url}/subcategoria`);
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
        await requestDelete(`${config.url}/subcategoria/${id}`);
        return Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>window.location.assign('/subcategorias'));
      }
    });
  }

  componentWillUnmount() {
  }


  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <SubCategoriaList subcategorias={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default SubCategorias;