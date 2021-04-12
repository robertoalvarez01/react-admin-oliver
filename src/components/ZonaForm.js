import React from 'react';
class ZonaForm extends React.Component {
  render() {
    return (
        <div className="container bg-light border rounded p-4"> 
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Zona</label>
              <input
                    onChange={this.props.onChange}
                    className="form-control"
                    type="text"
                    name="zona"
                    value={this.props.formValues.zona}
                    required
                  />
            </div>
            <div className="form-group">
              <label>Día de envío</label>
              <select className="form-control" defaultValue={this.props.formValues.dia} name="dia" onChange={this.props.onChange} required>
                <option value="">Seleccione un día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miercoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sabado">Sabado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Cotización de zona</label>
              <input
                    onChange={this.props.onChange}
                    className="form-control"
                    type="text"
                    name="precio"
                    value={this.props.formValues.precio}
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

export default ZonaForm;