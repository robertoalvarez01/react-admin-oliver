import React from 'react';

import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {getData} from '../../helpers/helpers';
import MarcaForm from '../../components/MarcaForm';
import config from '../../config/config';
const Swal = require('sweetalert2');

class EditMarca extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        formValues:undefined
      }
    }
    componentDidMount(){
      this.setState({
        ...this.state,
        loading:true
      });
      this.getMarca();
    }

    async getMarca(){
      try {
        const data = await getData(`${config.url}/marcas/${this.props.match.params.id}`);
        this.setState({
          loading:false,
          formValues:data.data[0]
        })
      } catch (error) {
        console.log(error);
      }
    }

    handleChange = e=>{
      this.setState({
        ...this.state,
        formValues:{
          [e.target.name]:e.target.value
        }
      })
    }

    handleSubmit = e => {
      e.preventDefault();
      this.setState({loading:true});
      const administrador = JSON.parse(localStorage.getItem('administrador'));
      let myHeaders = new Headers();
      myHeaders.append("token", administrador.token);
      let data = new FormData(document.getElementById('formAgregarMarca'));
      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };
      fetch(`${config.url}/marcas/update/${this.props.match.params.id}`,requestOptions).then(response => response.json()).then(resultado => {
        this.setState({loading:false});
        Swal.fire(
            'Modificación exitosa',
            'Se modifico la marca de manera exitosa!',
            'success'
        ).then(()=>(this.props.history.push('/marcas')))
      })
      .catch(error => console.log('error', error));
    };

    render() {
      return (
        (this.state.loading)?<Loader/>:
        <React.Fragment>
          <div className="container mt-4 p-2">
              <Link to="/marcas" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Modificar marca</p>
              <MarcaForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                loading={this.state.loading}
                formValues={this.state.formValues}
                accion="modificar"
              />
          </div>
        </React.Fragment>
      );
    }
}

export default EditMarca;