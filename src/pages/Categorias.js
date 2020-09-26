import React from 'react';

import CategoriasList from '../components/CategoriasList';
import config from '../config/config'

class Categorias extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const adminUser = JSON.parse(localStorage.getItem('administrador'));
		if (adminUser === null || !adminUser.usuario.admin) {
			window.location.assign('/ingresar');
		}
    var myHeaders = new Headers();
    myHeaders.append("token", adminUser.token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${config.url}/subcategoria`, requestOptions)
    .then(response => response.json())
    .then(result => {
        this.setState({data : result.data})
    })
    .catch(error => console.log('error', error));
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <React.Fragment>
        <CategoriasList categorias={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Categorias;