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
              <label>Peso del producto: </label>
              <input
              onChange={this.props.onChange}
              className="form-control"
              type="number"
              name="peso"
              value={this.props.formValues.peso}
            />
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