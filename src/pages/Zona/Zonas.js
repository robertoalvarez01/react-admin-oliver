import React, { Component } from 'react';
import Loader from '../../components/Loader';
import ZonasList from '../../components/ZonasList';
import config from '../../config/config';
import {authentication,getData,requestDelete} from '../../helpers/helpers';
const Swal = require('sweetalert2');

export default class Zonas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zonas: [],
            error:null,
            loading:false
        };
    }

    componentDidMount() {
        authentication();
        this.setState({
            ...this.state,
            loading:true
        });
        this.getZonas();
    }

    componentWillUnmount() {
    }
    
    async getZonas(){
        try {
            const data = await getData(`${config.url}/zonas`);
            this.setState({
                ...this.state,
                zonas:data.data,
                loading:false
            });
        } catch (error) {
            this.setState({
                ...this.state,
                loading:false,
                error
            });
        }
    }

    delete(id){
        Swal.fire({
          title: '¿Seguro quieres eliminar la zona?',
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then(async(result) => {
          if (result.isConfirmed) {
            await requestDelete(`${config.url}/zona/${id}`);
            Swal.fire(
              'Eliminado',
              'Recurso eliminado',
              'success'
            ).then(()=>{
                window.location.assign('/zonas-envio');
            })
          }
        })
    }

    render() {
        return (
            (this.state.loading)?<Loader/>:
            <React.Fragment>
                <ZonasList zonas={this.state.zonas} delete={this.delete}/>
            </React.Fragment>
        )
    }
}
