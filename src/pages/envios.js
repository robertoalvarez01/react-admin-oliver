import React, { useEffect, useState } from 'react';
import EnvioList from '../components/EnvioList';
import Loader from '../components/Loader';
import config from '../config/config';
import {authentication,requestDelete,getData} from '../helpers/helpers';
import Modal from '../components/Modal';
import DetalleVenta from '../components/DetalleVenta';
const Swal = require('sweetalert2');

const Envios = () => {
    useEffect(() => {
        authentication();
        getEnvios();
    }, []);

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataModal, setDataModal] = useState(null);
    
    const getEnvios = async()=>{
      try {
        const data = await getData(`${config.url}/envios`);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message)
      }
    }

    const borrar = (id)=>{
        console.log(id);
        Swal.fire({
            title: '¿Seguro quieres eliminar el envío?',
            text: "Puede que existan ventas con este envío, se eliminarán también.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                //await requestDelete(`${config.url}/marca/${id}`);
                Swal.fire(
                    'Eliminado',
                    'Recurso eliminado',
                    'success'
                ).then(()=>{
                    getEnvios();
                })
            }
        })
    } 
    
    const switchModal= ()=>{
        return setModalIsOpen(!modalIsOpen);
    }
    
    const mostrarDetalle = (dataVenta)=>{
        switchModal();
        setDataModal(dataVenta);
    }

    const cambiarEstado = id=>{
        Swal.fire({
            title: '¿Seguro quieres cambiar el estado del envío?',
            text: "Esta acción se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await getData(`${config.url}/envios/modificarEstado/${id}`);
                Swal.fire(
                    'Listo!',
                    'Estado del envio modificado',
                    'success'
                ).then(()=>{
                    getEnvios();
                })
            }
        })
    }

    return (
        (loading)?<Loader/>:
        <React.Fragment>
            {(modalIsOpen)?<Modal closeModal={switchModal}><DetalleVenta data={dataModal}/></Modal>:null}
            <EnvioList envios={data} delete={borrar} mostrarDetalle={mostrarDetalle} cambiarEstado={cambiarEstado}/>
        </React.Fragment>
    );
}
 
export default Envios;