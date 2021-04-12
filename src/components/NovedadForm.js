import React from 'react';
const NovedadForm = ({onSubmit,handleChange,formValues}) => {
    return (
        <div className="container bg-light border rounded p-4"> 
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Asunto</label>
                    <input
                        required
                        className="form-control"
                        type="text"
                        name="asunto"
                        value={formValues.asunto}
                        onChange={handleChange}
                        placeholder="Titulo del email" 
                    />
                </div>
                <div className="form-group">
                    <label>Novedad</label>
                    <textarea
                    required
                    className="form-control"
                    name="contenido"
                    defaultValue={formValues.contenido}
                    onChange={handleChange}
                    rows="30"    
                    />
                </div>
                <button type="submit" className="btn btn-outline-success btn-block">
                    Enviar
                </button>
            </form>
        </div>
    );
}
 
export default NovedadForm;