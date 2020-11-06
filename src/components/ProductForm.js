import React from 'react';

class ProductForm extends React.Component {
  render() {
    return (
      <div className="container bg-light border rounded p-4"> 
        <form onSubmit={this.props.onSubmit}>
          <div className="row">
            <div className="form-group col-12 col-md-6">
              <label>Nombre del producto: (obligatorio)</label>
              <input
                required
                onChange={this.props.onChange}
                className="form-control"
                type="text"
                name="producto"
                defaultValue={this.props.formValues.producto}
              />
            </div>

            <div className="form-group col-12 col-md-6">
              <label>Precio por unidad: (no es obligatorio)</label>
              <input
                required
                onChange={this.props.onChange}
                className="form-control"
                type="number"
                step="any"
                name="precioUnidad"
                value={this.props.formValues.precioUnidad}
              />
            </div>

            <div className="form-group col-12 col-md-3">
              <label>Categoria:</label>
              <select required className="form-control" name="idCategoria" defaultValue={this.props.formValues.idCategoria} onChange={this.props.onChange}>
                {this.props.categorias.map(cat=>(
                  <option value={cat.idCategoria} key={cat.idCategoria}>{cat.categoria}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-12 col-md-3">
              <label>Subcategoria:</label>
              <select required className="form-control" name="idSubCategoria" defaultValue={this.props.formValues.idSubCategoria} onChange={this.props.onChange}>
                {this.props.subCategorias.map(sc=>(
                  <option value={sc.idSubCategoria} key={sc.idSubCategoria}>{sc.subcategoria}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-12 col-md-3">
            <label>Marca:</label>
              <select required className="form-control" name="idMarca" defaultValue={this.props.formValues.idMarca} onChange={this.props.onChange}>
                {this.props.marcas.map(mk=>(
                  <option value={mk.idMarca} key={mk.idMarca}>{mk.marca}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-12 col-md-3">
            <label>Estado:</label>
              <select required className="form-control" name="disponible" defaultValue={this.props.formValues.disponible} onChange={this.props.onChange}>
                <option value="0">No disponible</option>
                <option value="1">Disponible</option>
              </select>
            </div>

            <div className="form-group col-12">
                <label>Descripción: </label>
                <textarea
                required
                onChange={this.props.onChange}
                className="form-control"
                rows="8"
                name="descripcionBasica"
                defaultValue={this.props.formValues.descripcionBasica}
              ></textarea>
            </div>

            <div className="form-group col-12">
              <label>Informacion nutricional:</label>
              <textarea
                required
                onChange={this.props.onChange}
                className="form-control"
                rows="12"
                name="descripcion"
                defaultValue={this.props.formValues.descripcion}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block">
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductForm;