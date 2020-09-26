import React from 'react';
import {Link} from 'react-router-dom'
class CategoriaForm extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="container mt-4 p-2">
        <Link to="/categorias" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
        <p className="text-center h3 mb-2">Agregar categoria</p>
        <div className="container bg-light border rounded p-4"> 
          <form onSubmit={this.props.handleSubmit}>
            <div className="form-group">
              <label>Descripción: (obligatorio)</label>
              <input
                    onChange={this.props.handleChange}
                    className="form-control"
                    type="text"
                    name="descripcion"
                    value={this.props.state.form.descripcion}
                  />
            </div>

            <div className="form-group">
              <label>Categoria Padre: (obligatorio)</label>
              <select
                onChange={this.props.handleChange}
                className="form-control"
                name="categoria"
                value={this.props.state.form.categoria}
              >
              <option value="none" hidden>Select an Option</option>
              {this.props.state.categorias.map(categoria => {
                  return <option key={categoria._id} value={categoria._id}>{categoria.descripcion}</option>
              })}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block">
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CategoriaForm;