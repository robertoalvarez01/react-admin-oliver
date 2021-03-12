import React, { useEffect, useState } from 'react';
import EnvioList from '../../components/EnvioList';
import Loader from '../../components/Loader';
import config from '../../config/config';
import {authentication,requestPut,getData} from '../../helpers/helpers';
import Modal from '../../components/Modal';
import DetalleVenta from '../../components/DetalleVenta';
import FiltrosEnvio from '../../components/FiltrosEnvio';
import {isMobile} from '../../helpers/helpers';
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
    const [filtros, setFiltros] = useState({
        tipo:'',
        idZona:'',
        diaEntrega:'',
        idEnvio:''
    })
    
    const getEnvios = async()=>{
      try {
        setLoading(true);
        let url = `${config.url}/envios`;
        if(filtros.tipo!==''){
            url += `?tipo=${filtros.tipo}`;
        }
        if(filtros.idZona!==''){
            url += `${(filtros.tipo!=='')?`&`:`?`}idZona=${filtros.idZona}`;
        }
        if(filtros.idEnvio!==''){
            url += `?idEnvio=${filtros.idEnvio}`;
        }
        const data = await getData(url);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message)
      }
    }

    const switchModal= ()=>{
        return setModalIsOpen(!modalIsOpen);
    }
    
    const mostrarDetalle = (dataVenta)=>{
        switchModal();
        setDataModal(dataVenta);
    }

    const cambiarEstadoEntregado = id=>{
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
                let email = data.filter(res=>res.idEnvio === id)[0].venta.email;
                if(!email) return Swal.fire('Error','Ha ocurrido un error','error');
                setLoading(true);
                await requestPut(`${config.url}/envios/modificarEstadoEntregado/${id}?email=${email}`);
                setLoading(false);
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

    const cambiarEstadoEnCamino = id=>{
        Swal.fire({
            title: '¿Seguro quieres notificar que el envío está en camino?',
            text: "Esta acción se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                let email = data.filter(res=>res.idEnvio == id)[0].venta.email;
                if(!email) return Swal.fire('Error','Ha ocurrido un error','error');
                await requestPut(`${config.url}/envios/modificarEstadoEnCamino/${id}?email=${email}`);
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

    const cambiarEstadoPagado = idVenta=>{
        Swal.fire({
            title: '¿Seguro quieres notificar la entrega de este pedido?',
            text: "Esta acción se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await requestPut(`${config.url}/ventas/modificarEstadoPago/${idVenta}`);
                if(response.ok){
                    return Swal.fire(
                        'Listo!',
                        'Estado del pedido modificado',
                        'success'
                    ).then(()=>{
                        getEnvios();
                    })
                }
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error con la operación',
                    'error'
                )
            }
        })
    }

    const aplicarFiltro = event=>{
        return setFiltros({
            ...filtros,
            [event.target.name]:event.target.value
        });
    }

    const filtrarEnvios = event=>{
        event.preventDefault();
        document.getElementById('formFiltroEnvios').classList.remove('show');
        document.getElementById('btn-mostrarFiltro').classList.remove('d-none');
        return getEnvios();
    }

    const escanearQr = ()=>{
        
    }

    return (
        <React.Fragment>
            {(modalIsOpen)?<Modal closeModal={switchModal}><DetalleVenta data={dataModal}/></Modal>:null}
            <div className="container pt-3">
                <h2>Listado de envíos</h2>
                <FiltrosEnvio filtros={filtros} aplicarFiltro={aplicarFiltro} filtrarEnvios={filtrarEnvios}/>
            </div>
            {(loading)?<Loader/>:
            <EnvioList envios={data} mostrarDetalle={mostrarDetalle} cambiarEstadoEntregado={cambiarEstadoEntregado} cambiarEstadoEnCamino={cambiarEstadoEnCamino} cambiarEstadoPagado={cambiarEstadoPagado}/>}
            {(isMobile())?
                <button className="mx-1 btn btn-danger" onClick={escanearQr}>
                <i class="fas fa-qrcode"></i>
              </button>
            :null}
        </React.Fragment>
    );
}
 
export default Envios;