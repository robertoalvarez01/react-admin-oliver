import React from 'react';
import BannerList from '../../components/BannerList';
import Loader from '../../components/Loader';
import config from '../../config/config'
import {requestDelete,getData} from '../../helpers/helpers';
const Swal = require('sweetalert2');

class Banners extends React.Component {
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
    this.getBanners();
  }
  
  async getBanners(){
    try {
      const data = await getData(`${config.url}/banners?admin=true`);
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
      title: '¿Seguro quieres eliminar el banner?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await requestDelete(`${config.url}/banner/${id}`);
        return Swal.fire(
          'Eliminado',
          'Recurso eliminado',
          'success'
        ).then(()=>window.location.assign('/banners'));
      }
    });
  }

  componentWillUnmount() {
  }


  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <BannerList banners={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default Banners;