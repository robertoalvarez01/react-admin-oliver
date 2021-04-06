import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {authentication,getData} from '../../helpers/helpers';
import config from '../../config/config';
import BannerForm from '../../components/BannerForm';
const Swal = require('sweetalert2');

class EditBanner extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        formValues:{
          descripcion:"",
          activo:0,
          url:""
        }
      }
    }
    componentDidMount(){
      authentication();
      this.setState({
        ...this.state,
        loading:true
      });
      this.getBanner();
    }

    async getBanner(){
      try {
        const data = await getData(`${config.url}/banner/${this.props.match.params.id}`);
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
          ...this.state.formValues,
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
        body: new FormData(document.getElementById('form-banner'))
      };
      fetch(`${config.url}/banner/${this.props.match.params.id}`,requestOptions).then(response => response.json()).then(resultado => {
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
            'Se modifico el banner de manera exitosa!',
            'success'
        ).then(()=>(this.props.history.push('/banners')))
      })
      .catch(error => console.log('error', error));
    };

    render() {
      return (
        (this.state.loading)?<Loader/>:
        <React.Fragment>
          <div className="container mt-4 p-2">
              <Link to="/banners" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
              <p className="text-center h3 mb-2">Modificar banner</p>
              <BannerForm
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

export default EditBanner;