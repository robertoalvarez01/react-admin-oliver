import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logoOliver from "../images/logo-mascota.png";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      administrador:null
    }
  }
  componentDidMount(){
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    if(administrador !== null){
      this.setState({
        administrador:administrador
      })
    }
  }
  render() {
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
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                {(this.state.administrador!==null)?
                  <a className="btn btn-warning" href="/ingresar">
                    <i className="fas fa-sign-out-alt"></i> Salir
                  </a>
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
}
