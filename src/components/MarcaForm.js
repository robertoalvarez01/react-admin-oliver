import React from 'react';
class MarcaForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    habilitarFormImagen(e){
        document.getElementById('form-imagen').classList.toggle('d-none');
    }

    render() {
        return (
            (this.props.accion === 'modificar' && this.props.formValues)?
                <div className="container bg-light border rounded p-4"> 
                    <form onSubmit={this.props.onSubmit} id="formAgregarMarca">
                        <div className="form-group">
                            <label>Marca</label>
                            <input
                            required
                            className="form-control"
                            type="text"
                            name="marca"
                            defaultValue={this.props.formValues.marca}
                            onChange={this.props.handleChange}
                            />
                        </div>
                        <input type="checkbox" className="mb-4" onChange={this.habilitarFormImagen}/> Modificar foto de la marca
                        <div className="form-group d-none" id="form-imagen">
                            <label>Imágen de la marca</label>
                            <input
                            className="form-control"
                            type="file"
                            name="imagen"
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-success btn-block">
                            Guardar
                        </button>
                    </form>
                </div>
            :
                <div className="container bg-light border rounded p-4"> 
                    <form onSubmit={this.props.onSubmit} id="formAgregarMarca">
                        <div className="form-group">
                            <label>Marca</label>
                            <input
                            required
                            className="form-control"
                            type="text"
                            name="marca"
                            />
                        </div>
                        <div className="form-group">
                            <label>Imágen de la marca</label>
                            <input
                            required
                            className="form-control"
                            type="file"
                            name="imagen"
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

export default MarcaForm;