import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logoOliver from "../images/logo-mascota.png";
import { UsuarioContext } from "../context/usuario/usuarioContext";
import Swal from 'sweetalert2';
import userPng from '../assets/user.jpg';
import SideBarMenu from './sidebarMenu';
import { isMobile } from "../helpers/helpers";
import './style/navbar.css';

const Navbar = () => {

  const {logueado,usuario,logout} = useContext(UsuarioContext);
  const [mostrarMenu, setMostrarMenu] = useState(false);

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
    <nav className="navbar navbar-expand-lg navbar-ligh" style={{backgroundColor:"#FFB347",zIndex:'2'}}>
      <section className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logoOliver} width={35} height={35} alt="Admin oliver" loading="lazy" />
        </Link>
        {logueado ? 
          <span className="d-block d-md-none" onClick={()=>setMostrarMenu(!mostrarMenu)}>
            <img src={usuario.foto ? usuario.foto : userPng} alt="user" height={34} width={34} style={{borderRadius:'17px'}}/>
          </span>
        : null}
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            { logueado ? 
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={usuario.foto ? usuario.foto : userPng} alt="user" height={34} width={34} style={{borderRadius:'17px'}}/>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div className="d-flex align-items-center px-3" style={{cursor:'pointer'}} onClick={cerrarSesion}>
                    <i className="fas fa-sign-out-alt"></i>
                    <p className="my-0 ml-2">Salir</p>
                  </div>
                </div>
              </li>
            : 
              null
            }
          </ul>
        </div>
      </section>
      {isMobile() ? <SideBarMenu show={mostrarMenu}/> : null}
    </nav>
  );
}
 
export default Navbar;

