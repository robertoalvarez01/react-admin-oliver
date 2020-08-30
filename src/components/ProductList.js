import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config/config';
// import './styles/BadgesList.css';
const Swal = require('sweetalert2');

class ProductListItem extends React.Component {
  handleDelete (idProduct){
    console.log(idProduct);
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    Swal.fire({
      title: 'Estas seguro?',
      text: "Quieres eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        var myHeaders = new Headers();
        myHeaders.append("token", administrador.token);

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        console.log(idProduct)
        fetch(`${config.url}/producto/${idProduct}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            const dataProduct = JSON.parse(result);
            console.log(dataProduct);
            if (!dataProduct.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrió un error inesperado, intente denuevo'
                });				  
            }

            Swal.fire(
                'Listo!',
                'Se ha eliminado su producto!',
                'success'
            )
            this.props.history.push('/productos');
          })
          .catch(error => console.log('error', error));
      }
    })
  }
  render() {
    return (
      <tr>
        <th scope="row">{this.props.producto.nombre}</th>
        <td>{this.props.producto.marca.descripcion}</td>
        <td>{this.props.producto.precioUni}</td>
        <td>{this.props.producto.disponible && <p>Disponible</p>}{!this.props.producto.disponible && <p>No Disponible</p>}</td>
        <td>{this.props.producto.categoria.descripcion}</td>
        <td><Link to={`/describirProducto/${this.props.producto._id}`}>Ver</Link> - <Link to={`/editarProducto/${this.props.producto._id}`}>Editar</Link> - <Link onClick={() => this.handleDelete(this.props.producto._id)}>Eliminar</Link> - <Link to={`/imagen/${this.props.producto._id}`}>Imagen</Link></td>
      </tr>
    );
  }
}

class ProductList extends React.Component {
  componentDidMount(){
		const adminUser = localStorage.getItem('administrador');
		if (adminUser === null) {
			this.props.history.push('/ingresar');
		}
	}
  render() {
    return (
        <div className="mx-3 mt-3">
            <div>
                <Link to="/producto/agregar" className="btn btn-outline-success float-right mb-2">Agregar producto</Link>
                <Link to="/" className="btn btn-outline-danger float-right mb-2 mr-2">Volver al inicio</Link>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
            <tbody>
            {this.props.products.map(product => {
                return (
                    <ProductListItem key={product._id} producto={product} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default ProductList;