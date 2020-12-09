import React from 'react';
class LegalesForm extends React.Component {
    render() {
        return (
            <div className="container bg-light border rounded p-4"> 
                <form onSubmit={this.props.onSubmit} id="formModificarLegales">
                    <div className="form-group">
                        <label>Políticas de privacidad</label>
                        <textarea
                        required
                        className="form-control"
                        name="politica_privacidad"
                        defaultValue={this.props.formValues.politica_privacidad}
                        onChange={this.props.handleChange}
                        rows="30"    
                        />
                    </div>
                    <div className="form-group">
                        <label>Términos y condiciones</label>
                        <textarea
                        required
                        className="form-control"
                        name="terminos_condiciones"
                        defaultValue={this.props.formValues.terminos_condiciones}
                        onChange={this.props.handleChange}
                        rows="30"    
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

export default LegalesForm;