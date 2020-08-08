import React from 'react';

class PruebaForm extends React.Component {
  state = {
    form: {
      descripcion: '',
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

        fetch("http://localhost:3000/upload/producto/"+this.state.form.descripcion, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      };

    // ----------------------------



  render() {
    return (
      <div className="container bg-light border rounded p-4"> 
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Descripción: (obligatorio)</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="descripcion"
              value={this.state.form.descripcion}
            />
          </div>
          <div className="form-group">
            <label>Example file input</label>
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

export default PruebaForm;