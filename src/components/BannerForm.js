import React from 'react';

class BannerForm extends React.Component {
  habilitarInputfile=event=>{
    document.getElementById('input-file-banner').classList.toggle('d-none');
  }
  render() {
    return (
        (this.props.formValues === undefined)?null:
        <div className="container bg-light border rounded p-4"> 
          <form onSubmit={this.props.onSubmit} id="form-banner">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Descripción</label>
                  <input
                        onChange={this.props.onChange}
                        className="form-control"
                        type="text"
                        name="descripcion"
                        defaultValue={this.props.formValues.descripcion || ''}
                        required
                      />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Activo</label>
                  <select
                        onChange={this.props.onChange}
                        className="form-control"
                        type="text"
                        name="activo"
                        defaultValue={this.props.formValues.activo}
                        required
                      >
                        <option value="0">No</option>
                        <option value="1">Si</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                    <input type="checkbox" onChange={this.habilitarInputfile}/> Modificar imágen
                    <input type="file" name="foto" className={`form-control ${this.props.add ? '':'d-none'}`} id="input-file-banner"/>
                  </div>
                </div>
              <div className="col-12 col-md-6">
                {this.props.add ? null :<img src={this.props.formValues.url} alt={this.props.formValues.descripcion} className="img-fluid"/>}
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block my-4">
              Guardar
            </button>
          </form>
        </div>
    );
  }
}

export default BannerForm;