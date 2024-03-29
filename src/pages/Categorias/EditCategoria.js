import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {getData} from '../../helpers/helpers';
import config from '../../config/config';
import CategoriaForm from '../../components/CategoriaForm';
const Swal = require('sweetalert2');

class EditCategoria extends React.Component {
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
      this.getCategoria();
    }

    async getCategoria(){
      try {
        const data = await getData(`${config.url}/categorias/${this.props.match.params.id}`);
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
      this.setState({...this.state,loading:true});
      const administrador = JSON.parse(localStorage.getItem('administrador'));
      let myHeaders = new Headers();
      myHeaders.append("token", administrador.token);
      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: new FormData(document.getElementById('form-categoria'))
      };
      fetch(`${config.url}/categorias/update/${this.props.match.params.id}`,requestOptions).then(response => response.json()).then(resultado => {
        this.setState({...this.state,loading:false});
        if (resultado.error) {
          return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: resultado.error
          });
        }
        return Swal.fire(
            'Modificación exitosa',
            'Se modifico la categoria de manera exitosa!',
            'success'
        ).then(()=>(this.props.history.push('/categorias')))
      })
      .catch(error => console.log('error', error));
    };

    render() {
      return (
        (this.state.loading)?<Loader/>:
        <React.Fragment>
          <div className="container mt-4 p-2">
              <Link to="/categorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Modificar categoria</p>
              <CategoriaForm
                add={false}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.formValues}
              />
          </div>
        </React.Fragment>
      );
    }
}

export default EditCategoria;