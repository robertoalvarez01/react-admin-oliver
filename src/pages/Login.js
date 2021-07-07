import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { UsuarioContext } from '../context/usuario/usuarioContext';
import Loader from '../components/Loader';
import "./styles/Login.css";

const Swal = require("sweetalert2");


const Login = (props) => {
	const [formValues, setFormValues] = useState({
		email:'',
		password:''
	});
	const {loading,error,logueado,usuario,login} = useContext(UsuarioContext);

	useEffect(() => {
		if(logueado){
			window.location.assign('/');
		}
	}, []);

	useEffect(() => {
		if(logueado && usuario){
			Swal.fire('Bienvenido',`Hola ${usuario.nombre}, bienvenido.`,'success').then(()=>{
				props.history.push('/');
			})
		}
	}, [logueado])

	useEffect(() => {
		if(error){
			Swal.fire('Error',error.info,'error')
		}
	}, [error])

	const handleChange = e =>{
		setFormValues({
			...formValues,
			[e.target.name]:e.target.value
		})
	};

	const handleSubmit = e =>{
		e.preventDefault();
		if(formValues.email.trim() === "" || formValues.password.trim() === ""){
			return false;
		}
		login(formValues);
	}

	return (
		<div className="myForm">
			<form className="bg-dark text-white p-5" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input className="form-control input-lg text-center" type="email" name="email" id="email" placeholder="Ingrese su Email..." onChange={handleChange} value={formValues.email}/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input className="form-control input-lg text-center" type="password" name="password" placeholder="Ingrese su Contraseña..." onChange={handleChange} value={formValues.password}/>
				</div>
				<div className="form-group mt-5">
					{loading ? <Loader/> : <input type="submit" name="submit" className="btn btn-success btn-block" value="Ingresar"/>}
				</div>
			</form>
		</div>
	);
}
 
export default Login;
