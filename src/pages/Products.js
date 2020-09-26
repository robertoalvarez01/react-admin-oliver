import React from 'react';
import ProductList from "../components/ProductList";
import config from '../config/config';

// import './styles/Badges.css';
// import confLogo from '../images/badge-header.svg';
// import BadgesList from '../components/BadgesList';

class Products extends React.Component {
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
    const administrador = JSON.parse(adminUser);
    var myHeaders = new Headers();
    myHeaders.append("token", administrador.token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${config.url}/subproducto`, requestOptions)
    .then(response => response.json())
    .then(result => {
        this.setState({data : result.data})
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
        <ProductList products={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Products;