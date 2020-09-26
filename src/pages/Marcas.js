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
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    if (administrador === null) {
      this.props.history.push('/ingresar');
    }
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${config.url}/marca`, requestOptions)
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
        <MarcasList marcas={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Marcas;