import React, { Component } from 'react';
import "./styles/Login.css";
import config from '../config/config';

const Swal = require("sweetalert2");
export default class Home extends Component {
	state = {
		form: {
		  email: '',
		  password: ''
		},
	};

	componentDidMount() {
		localStorage.removeItem('administrador')
	}

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

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("email", this.state.form.email);
		urlencoded.append("password", this.state.form.password);

		var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow'
		};

		fetch(`${config.url}/login`, requestOptions)
		.then(response => response.json())
		.then(result => {
			if (!result.ok || result.usuario.admin!==1) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No coinciden sus credenciales con ninguno de los administradores, Por favor intente denuevo...'
				});				  
			}

			Swal.fire(
				'Ingreso exitoso!',
				'Bienvenido '+result.usuario.nombre+', no olvides cerrar sesion cuando termines...',
				'success'
			).then(()=>{
				localStorage.setItem('administrador', JSON.stringify(result));
				window.location.assign('/');
			})
		})
		.catch(error => console.log('error', error));
	};

	render() {
		return (
			<div>
				<div className="container">
					<form className="myForm bg-dark text-white p-5 border rounded" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input className="form-control input-lg text-center" type="email" name="email" id="email" placeholder="Ingrese su Email..." onChange={this.handleChange} value={this.state.form.email}/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Contraseña</label>
							<input className="form-control input-lg text-center" type="password" name="password" placeholder="Ingrese su Contraseña..." onChange={this.handleChange} value={this.state.form.password}/>
						</div>
						<div className="form-group mt-5">
							<input type="submit" name="submit" className="btn btn-success btn-block" defaultValue="Sign Up" />
						</div>
					</form>
				</div>
			</div>
		);
	}
}