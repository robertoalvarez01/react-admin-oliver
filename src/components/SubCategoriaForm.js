import React from 'react';
class CategoriaForm extends React.Component {
  render() {
    return (
        <div className="container bg-light border rounded p-4"> 
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Subcategoria</label>
              <input
                    onChange={this.props.onChange}
                    className="form-control"
                    type="text"
                    name="subcategoria"
                    defaultValue={this.props.formValues.subcategoria}
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