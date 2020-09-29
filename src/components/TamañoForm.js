import React from 'react';
class CategoriaForm extends React.Component {
  render() {
    return (
        <div className="container bg-light border rounded p-4"> 
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Tamaño</label>
              <input
                    onChange={this.props.onChange}
                    className="form-control"
                    type="text"
                    name="tamaño"
                    defaultValue={this.props.formValues.tamaño}
                    required
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

export default CategoriaForm;