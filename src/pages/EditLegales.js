import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import {authentication,getData} from '../helpers/helpers';
//import MarcaForm from '../components/MarcaForm';
import config from '../config/config';
import LegalesForm from '../components/LegalesForm';
const Swal = require('sweetalert2');

export default class EditLegales extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading:false,
          formValues:undefined
        }
      }
    componentDidMount(){
        authentication();
        this.setState({
            ...this.state,
            loading:true
        });
        this.getData();
    }

    async getData(){
        try {
            const data = await getData(`${config.url}/legales`);
            this.setState({
                loading:false,
                formValues:data.data[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = e=>{
        this.setState({
            ...this.state,
            formValues:{
                ...this.state.formValues,
                [e.target.name]:e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({...this.state,loading:true});
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({
                terminos:this.state.formValues.terminos_condiciones,
                politica:this.state.formValues.politica_privacidad
            }),
            redirect: 'follow'
        };
        fetch(`${config.url}/legales`,requestOptions).then(response => response.json()).then(resultado => {
            console.log(resultado);
            this.setState({...this.state,loading:false});
            Swal.fire(
                'Modificación exitosa',
                'Se modificó de manera exitosa!',
                'success'
            ).then(()=>(this.props.history.push('/legales')))
        })
        .catch(error => console.log('error', error));
    };

    render() {
        return (
            (this.state.loading || this.state.formValues == undefined)?<Loader/>:
            <React.Fragment>
                <div className="container mt-4 p-2">
                    <Link to="/legales" className="mb-2 btn btn-outline-danger float">Volver</Link>
                    <p className="text-center h3 mb-2">Modificar Legales</p>
                    <LegalesForm formValues={this.state.formValues} onSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                </div>
            </React.Fragment>
        )
    }
}
