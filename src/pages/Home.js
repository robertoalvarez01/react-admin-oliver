import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
	state = {
		administrador: '',
	};
	// Aquí irá el hook que reenviará a /Login
	componentDidMount(){
		const adminUser = localStorage.getItem('administrador');
		if (adminUser === null) {
			this.props.history.push('/ingresar');
		}
	}

  render() {
    return (
      <div>
        <div className="list-group container text-center mt-4">
        	<Link to="/productos" className="list-group-item list-group-item-action">PRODUCTOS</Link>
					<Link to="/categorias" className="list-group-item list-group-item-action">CATEGORIAS</Link>
					<Link to="/marcas" className="list-group-item list-group-item-action">MARCAS</Link>
					<Link to="/ingresar" className="list-group-item list-group-item-action list-group-item-danger">CERRAR SESIÓN</Link>
        </div>
      </div>
    );
  }
}
