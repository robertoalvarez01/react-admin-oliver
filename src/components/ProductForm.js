import React from 'react';
import config from '../config/config';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            marcas: []
        };
    }

    componentDidMount(){
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        try {
            var myHeaders = new Headers();
            myHeaders.append("token", administrador.token);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch(`${config.url}/categoria` , requestOptions)
            .then(response => response.text())
            .then(result => {
                const categoriasRes = JSON.parse(result).categorias;
                this.setState({
                    categorias:categoriasRes
                })
            })
            .catch(error => console.log('error', error));

            fetch(`${config.url}/marca`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const marcasRes = JSON.parse(result).marcas;
                this.setState({
                    marcas:marcasRes
                })
            })
            .catch(error => console.log('error', error));
        } catch (error) {
            
        }
    }
  render() {
    return (
      <div className="container bg-light border rounded p-4"> 
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>Nombre del producto: (obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="nombre"
              value={this.props.formValues.nombre}
            />
          </div>

          <div className="form-group">
            <label>Precio por unidad: (obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="number"
              name="precioUni"
              value={this.props.formValues.precioUni}
            />
          </div>

          <div className="form-group">
            <label>Categoria: (obligatorio)</label>
            <select
              onChange={this.props.onChange}
              className="form-control"
              name="categoria"
              value={this.props.formValues.categoria}
            >
            <option value="none" hidden>Select an Option</option>
            {this.state.categorias.map(categoria => {
                return <option key={categoria._id} value={categoria._id}>{categoria.descripcion}</option>
            })}
            </select>
          </div>

          <div className="form-group">
            <label>Descripcion Basica: (obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="descripcionBasica"
              value={this.props.formValues.descripcionBasica}
            />
          </div>

          <div className="form-group">
            <label>Marca: (obligatorio)</label>
            <select
              onChange={this.props.onChange}
              className="form-control"
              name="marca"
              value={this.props.formValues.marca}
            >
            <option value="none" hidden>Select an Option</option>
            {this.state.marcas.map(marca => {
                return <option key={marca._id} value={marca._id}>{marca.descripcion}</option>
            })}
            </select>
          </div>

          <div className="form-group">
              <label>Descripcion completa del producto: (obligatorio)</label>
              <textarea className="form-control"
                rows="10"
                onChange={this.props.onChange}
                name="descripcion"
                value={this.props.formValues.descripcion}>

              </textarea>
          </div>

          <div className="form-group">
            <label>Stock actual: (obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="number"
              name="stock"
              value={this.props.formValues.stock}
            />
          </div>

          <div className="form-group">
            <label>Stock minimo para enviar un alerta de reposición: (obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="number"
              name="minimo"
              value={this.props.formValues.minimo}
            />
          </div>

          <div className="form-group">
            <label>Codigo de barra: (no es obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="codigoBarra"
              value={this.props.formValues.codigoBarra}
            />
          </div>

          <button type="submit" className="btn btn-outline-success btn-block">
            Guardar
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm;