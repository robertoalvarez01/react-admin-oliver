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
      error:null
    };
  }

  componentDidMount() {
    this.setState({...this.state,loading:true});
    authentication();
    this.getProductos();
  }

  async getProductos(){
    try {
      const data = await getData(`${config.url}/producto`);
      this.setState({...this.state,data:data.data,loading:false});
    } catch (error) {
      this.setState({...this.state,error,loading:false})
    }
  }

  delete(id){
    Swal.fire({
      title: '¿Seguro quieres eliminar el producto?',
      text: "Esta accción no se puede deshacer",
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

  render() {
    return (
      (this.state.loading)?<Loader/>:
      <React.Fragment>
        <ProductList products={this.state.data} delete={this.delete}/>
      </React.Fragment>
    );
  }
}

export default Products;