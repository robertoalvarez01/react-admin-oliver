import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logoOliver from "../images/logo-mascota.png";

export default class Home extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
					<Link className="navbar-brand mx-auto" to="/">
      			<img src={logoOliver} width={40} height={40} alt="Admin oliver" loading="lazy" />
    			</Link>
  			</nav>
      </div>
    );
  }
}
