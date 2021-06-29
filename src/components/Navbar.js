import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import logoOliver from "../images/logo-mascota.png";
import { UsuarioContext } from "../context/usuario/usuarioContext";
import Swal from 'sweetalert2';

const Navbar = () => {

  const {logueado,usuario,logout} = useContext(UsuarioContext);

  const cerrarSesion =  () => {
    Swal.fire({
      title: '¿Seguro quieres abandonar la sesión?',
      text: "Tendrás que reingresar tus credenciales otra vez",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        logout();
        window.location.assign('/ingresar');
      }
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFB347"}}>
      <section className="container">
        <Link className="navbar-brand" to="/">
          <img src={logoOliver} width={40} height={40} alt="Admin oliver" loading="lazy" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Productos
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/productos">Productos</Link>
                <Link className="dropdown-item" to="/subproductos">Subproductos</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categorias
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/categorias">Categorias</Link>
                <Link className="dropdown-item" to="/subcategorias">Subcategorias</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marcas">Marcas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tamaños">Tamaños</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/legales">Legales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/zonas-envio">Zonas de envío</Link>
            </li>
            <li className="nav-item">
              {logueado ?
                <button type="button" className="btn btn-warning" onClick={cerrarSesion}>
                  <i className="fas fa-sign-out-alt"></i> Salir
                </button>
              :
                null
              }
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
}
 
export default Navbar;

