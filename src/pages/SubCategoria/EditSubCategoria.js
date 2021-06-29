import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {getData} from '../../helpers/helpers';
import config from '../../config/config';
import SubCategoriaForm from '../../components/SubCategoriaForm';
const Swal = require('sweetalert2');

class EditSubCategoria extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        error:null,
        formValues:{
          subcategoria:''
        }
      }
    }
    
    async componentDidMount(){
        try {
            this.setState({
                ...this.state,
                loading:true
            })
            await this.getSubCategoria();
        } catch (error) {
            
        }
    }

    async getSubCategoria(){
        try {
            const data = await getData(`${config.url}/subcategoria/${this.props.match.params.id}`);
            return this.setState({
                ...this.state,
                formValues:{
                    subcategoria:data.data[0].subcategoria
                },
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

    handleChange = e => {
      this.setState({
        ...this.state,
        formValues: {
          ...this.state.formValues,
          [e.target.name]: e.target.value
        }
      });
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.setState({...this.state,loading:true});
      const administrador = JSON.parse(localStorage.getItem('administrador'));
      let myHeaders = new Headers();
      myHeaders.append("token", administrador.token);
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: 'PUT',
        body: JSON.stringify(this.state.formValues),
        headers:myHeaders
      };
      fetch(`${config.url}/subcategoria/${this.props.match.params.id}`, requestOptions)
        .then(response => response.json())
        .then(resultado => {
          this.setState({...this.state,loading:false});
          if (resultado.error) {
              return Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: resultado.error
              });
          }
          Swal.fire(
              'Guardado exitoso',
              'Se Modificó la subcategoria de manera exitosa!',
              'success'
          ).then(()=>this.props.history.push('/subcategorias'));
        })
        .catch(error => console.log('error', error));
    };
  
    render() {
      return (
        (this.state.loading)?<Loader/>:
        <React.Fragment>
          <div className="container mt-4 p-2">
                <Link to="/subcategorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
                <p className="text-center h3 mb-2">Editar subcategoria</p>
                <SubCategoriaForm 
                onChange={this.handleChange}
                formValues={this.state.formValues}
                onSubmit={this.handleSubmit}/>
          </div>
        </React.Fragment>
      );
    }
}

export default EditSubCategoria;