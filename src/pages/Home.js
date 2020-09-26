import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu.json';
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
		<div className="container mt-5">
            <div className="row">
                {Menu.map(item=>(
                    <div key={item.id} className="col-12 col-sm-6 col-md-4 my-3">
                        <div className="card">
                            <div className="card-header">
                                {item.titulo}
                            </div>
                            <div className="card-body">
                                <p className="card-text">{item.subtitulo}</p>
                                <Link to={item.url} className="btn btn-warning btn-block">{item.boton}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  }
}
