import React from 'react';
const MediosDePagoForm = (props) => {
    return (
        <div className="container py-4">
            <form onSubmit={props.handleSubmit} className="form-group">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <input placeholder="Nombre del medio de pago" type="text" name="medio" value={props.formValues.medio} onChange={props.handleChange} className="form-control"/>
                    </div>
                    <div className="col-12 col-md-6">
                        <select name="habilitado" defaultValue={props.formValues.habilitado} onChange={props.handleChange} className="form-control">
                            <option value="0">No disponible</option>
                            <option value="1">Disponible</option>
                        </select>
                    </div>
                    <div className="col-12 mt-3 text-center">
                        <input type="submit" className="btn btn-info" value="Enviar"/>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default MediosDePagoForm;