import React from 'react';
import config from '../config/config';
import {Link} from 'react-router-dom';

// import './styles/Badges.css';
// import confLogo from '../images/badge-header.svg';
// import BadgesList from '../components/BadgesList';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      token: ''
    };
  }

  componentDidMount() {
        const adminUser = JSON.parse(localStorage.getItem('administrador'));
        if (adminUser === null) {
        this.props.history.push('/ingresar');
        }
        var myHeaders = new Headers();
        myHeaders.append("token", adminUser.token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`${config.url}/subproducto/${this.props.match.params.productId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const product = JSON.parse(result);
            this.setState({data : product.res, token: adminUser.token});
            console.log(this.state);
        })
        .catch(error => console.log('error', error));
  }

//   componentDidUpdate(prevProps, prevState) {
//     console.log({
//       prevProps: prevProps,
//       prevState: prevState,
//     });

//     console.log({
//       props: this.props,
//       state: this.state,
//     });
//   }

  componentWillUnmount() {
  }

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron m-5">
            <Link to="/productos" className="mb-2 btn btn-outline-danger float-right">Volver al listado</Link>
            <h1 className="display-4">{this.state.data.nombre}</h1>
            <p className="lead d-inline-block mt-2">{`Precio: ${this.state.data.precioUni}`}</p>
            <p className="lead d-inline-block mt-2 ml-5">{`Stock: ${this.state.data.stock}`}</p>
            <br />
            <p className="lead d-inline-block mt-2">{`Stock mínimo: ${this.state.data.minimo}`}</p>
            <p className="lead d-inline-block mt-2 ml-5">{`Código de barra: ${this.state.data.codigoBarra}`}</p>
            <br />
            <p className="lead d-inline-block mt-2">{`Peso del producto: ${this.state.data.peso}`}</p>
            {this.state.data.img && <img src={`${config.url}/imagen/producto/${this.state.data.img}?token=${this.state.token}`} alt="..." class="img-thumbnail"></img>}
            <hr className="my-4" />
        </div>

      </React.Fragment>
    );
  }
}

export default Products;