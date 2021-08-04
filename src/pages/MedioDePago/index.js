import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import config from '../../config/config';
import {request,requestDelete} from '../../helpers/helpers';
import Modal from '../../components/Modal';
import MediosDePagoList from '../../components/MediosDePagoList';
import MediosDePagoForm from '../../components/MediosDePagoForm';
const Swal = require('sweetalert2');

const MediosDePago = () => {
    useEffect(() => {
        getMedios();
    }, []);
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        idMedioPago:'',
        medio:'',
        habilitado:''
    });
    const [actionForm, setActionForm] = useState(null);

    const getMedios = ()=>{
        setLoading(true);
        request(`${config.url}/medioDePago`,'GET').then(res=>{
            setData(res.data);
            setLoading(false);
        }).catch(err=>{
            setError(err);
        })
    }

    const borrar = (id)=>{
        Swal.fire({
            title: '¿Seguro quieres eliminar el Medio?',
            text: "Puede que existan ventas con este medio, se eliminarán también.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await requestDelete(`${config.url}/medioDePago/delete/${id}`);
                Swal.fire(
                    'Eliminado',
                    'Recurso eliminado',
                    'success'
                ).then(()=>{
                    getMedios();
                })
            }
        })
    } 
    
    const switchModal= ()=>{
        return setModalIsOpen(!modalIsOpen);
    }
    
    const mostrarDetalle = (data)=>{
        setFormValues({
            idMedioPago:data.idMedioPago,
            medio:data.medio,
            habilitado:data.habilitado
        });
        setActionForm('edit');
        switchModal();
    }

    const nuevoMedio = ()=>{
        setFormValues({
            idMedioPago:'',
            medio:'',
            habilitado:'1'
        });
        setActionForm('new');
        switchModal();
    }

    const handleChange = event=>{
        return setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = async event=>{
        event.preventDefault();
        setModalIsOpen(false);
        setLoading(true);
        let url = `${config.url}/medioDePago/add`;
        let method = 'POST';
        if(actionForm=='edit'){
            url = `${config.url}/medioDePago/update/${formValues.idMedioPago}`;
            method = 'PUT';
        }
        request(url,method,JSON.stringify(formValues)).then(()=>{
            setLoading(false);
            Swal.fire('Listo','Operación finalizada','success').then(()=>getMedios());
        }).catch(err=>{
            setLoading(false);
            Swal.fire('Error',err,'error');
        })
    }
    
    return (
        <React.Fragment>
            {(modalIsOpen)?<Modal closeModal={switchModal}><MediosDePagoForm formValues={formValues} handleSubmit={handleSubmit} handleChange={handleChange}/></Modal>:null}
            <div className="container pt-3">
                <h2>Listado de Medios de pago</h2>
            </div>
            {(loading)?<Loader/>:
            <MediosDePagoList mediosDePago={data} delete={borrar} mostrarDetalle={mostrarDetalle} error={error} nuevoMedio={nuevoMedio}/>}
        </React.Fragment>
    );
}
 
export default MediosDePago;