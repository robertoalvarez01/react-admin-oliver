import React from 'react';

import { Link } from 'react-router-dom';

import ProductForm from '../components/ProductForm';
import config from '../config/config';

const Swal = require('sweetalert2');
class NewProduct extends React.Component {
  componentDidMount(){
		const adminUser = localStorage.getItem('administrador');
		if (adminUser === null) {
			this.props.history.push('/ingresar');
		}
	}
  state = {
    form: {
      nombre: '',
      precioUni: '',
      categoria: '',
      descripcionBasica: '',
      marca: '',
      descripcion: '',
      stock: '',
      minimo: '',
      codigoBarra: '',
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", this.state.form.nombre);
    urlencoded.append("precioUni", this.state.form.precioUni);
    urlencoded.append("categoria", this.state.form.categoria);
    urlencoded.append("descripcionBasica", this.state.form.descripcionBasica);
    urlencoded.append("marca", this.state.form.marca);
    urlencoded.append("descripcion", this.state.form.descripcion);
    urlencoded.append("stock", this.state.form.stock);
    urlencoded.append("minimo", this.state.form.minimo);
    urlencoded.append("codigoBarra", this.state.form.minimo);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(`${config.url}/producto`, requestOptions)
      .then(response => response.text())
      .then(resultado => {
        const result = JSON.parse(resultado);
        console.log(result);
        if (!result.ok) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.err.message
            })
        }

        Swal.fire(
            'Guardado exitoso',
            'Se guardó '+ result.producto.nombre + ' de manera exitosa!',
            'success'
        )

        this.props.history.push('/productos');
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div> */}

        <div className="container mt-4 p-2">
            <Link to="/productos" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
            <p className="text-center h3 mb-2">Agregar producto</p>
            <ProductForm
            onChange={this.handleChange}
            formValues={this.state.form}
            onSubmit={this.handleSubmit}
            />
        </div>
      </React.Fragment>
    );
  }
}

export default NewProduct;