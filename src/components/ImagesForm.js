import React from 'react';
import config from '../config/config';

const Swal = require("sweetalert2");
class ImagesForm extends React.Component {
    state = {
    form: {
        imagen: ''
    }
    };

    // ----------------------------

    handleChange = e => {
        this.setState({
            form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
            },
        });
        console.log(this.state);
        };
    
        handleSubmit = e => {
        e.preventDefault();
        const fileInput = document.querySelector('#imagen-producto');
        var formdata = new FormData();
        formdata.append("archivo", fileInput.files[0], fileInput.files[0].name);

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${config.url}/upload/producto/`+this.props.match.params.productId, requestOptions)
            .then(response => response.text())
            .then(result => {
                const dataImage = JSON.parse(result);
                if (!dataImage.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrió un error inesperado, intente denuevo'
                    });				  
                }

                Swal.fire(
                    'Listo!',
                    'Se ha guardado la imagen del producto',
                    'success'
                )

                this.props.history.push('/productos');
            })
            .catch(error => console.log('error', error));
        };

    // ----------------------------



    render() {
    return (
        <div className="container bg-light border rounded p-4 mt-5"> 
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>Ingrese la nueva imagen del producto</label>
            <input type="file" id="imagen-producto" onChange={this.handleChange} className="form-control-file" name="imagen" value={this.state.form.imagen}/>
        </div>
            <button type="submit" className="btn btn-outline-success btn-block">
            Guardar
            </button>
        </form>
        </div>
    );
    }
}

export default ImagesForm;