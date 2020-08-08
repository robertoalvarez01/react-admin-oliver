import React from 'react';

class CategoriaMarcaForm extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
      <div className="container bg-light border rounded p-4"> 
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>Descripción: (obligatorio)</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="descripcion"
              value={this.props.formValues.descripcion}
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

export default CategoriaMarcaForm;