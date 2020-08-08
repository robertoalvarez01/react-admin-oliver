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
    const adminUser = localStorage.getItem('administrador');
    if (adminUser === null) {
        this.props.history.push('/ingresar');
    }
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${config.url}/categoria`, requestOptions)
    .then(response => response.text())
    .then(result => {
        const resultados = JSON.parse(result);
        console.log(resultados) // SACAR ESTA LINEA DESPUES!!!!
        this.setState({data : resultados.categorias})
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