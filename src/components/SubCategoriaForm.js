import React from 'react';
class CategoriaForm extends React.Component {
  constructor(props) {
      super(props);
  }
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
            <div className="form-group">
              <label>Categoria</label>
              <select className="form-control" name="idCategoria" defaultValue={this.props.formValues.idCategoria} onChange={this.props.onChange}>
                {this.props.categorias.map(categoria=>(
                  <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.categoria}</option>
                ))}
              </select>
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