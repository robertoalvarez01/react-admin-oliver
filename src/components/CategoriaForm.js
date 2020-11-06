import React from 'react';
import config from '../config/config'
class CategoriaForm extends React.Component {
  habilitarInputfile=event=>{
    document.getElementById('input-file-categoria').classList.toggle('d-none');
  }
  render() {
    return (
        (this.props.formValues === undefined)?null:
        <div className="container bg-light border rounded p-4"> 
          <form onSubmit={this.props.onSubmit} id="form-categoria">
            <div className="form-group">
              {(!this.props.add)?<img src={`${config.url}/img/${this.props.formValues.foto}`} width="80px" height="80px" className="d-block"/>:null}
              <label>Categoria</label>
              <input
                    onChange={this.props.onChange}
                    className="form-control"
                    type="text"
                    name="categoria"
                    defaultValue={this.props.formValues.categoria}
                    required
                  />
            </div>
            {(!this.props.add)?
              <div className="form-group col-12 col-md-4">
                <input type="checkbox" onChange={this.habilitarInputfile}/> Modificar imágen de la categoria
                <input type="file" id="input-file-categoria" name="foto" className="form-control d-none"/>
              </div>  
            :
              <div className="form-group">
                <label>Icono de categoria</label>
                <input
                  type="file"
                  name="foto"
                  className="form-control"/>
              </div>
            }
            <button type="submit" className="btn btn-outline-success btn-block">
              Guardar
            </button>
          </form>
        </div>
    );
  }
}

export default CategoriaForm;