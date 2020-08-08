import React from 'react';

import MarcasList from '../components/MarcasList';
import config from '../config/config';

class Marcas extends React.Component {
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

    fetch(`${config.url}/marca`, requestOptions)
    .then(response => response.text())
    .then(result => {
        const resultados = JSON.parse(result);
        console.log(resultados) // SACAR ESTA LINEA DESPUES!!!!
        this.setState({data : resultados.marcas})
    })
    .catch(error => console.log('error', error));
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <React.Fragment>
        <MarcasList marcas={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Marcas;