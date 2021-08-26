import React, { useReducer } from 'react';
import config from '../../config/config';
import { OFERTAS_AGREGAR, OFERTAS_AGREGAR_PRODUCTO, OFERTAS_ELIMINAR, OFERTAS_ELIMINAR_PRODUCTO, OFERTAS_ERROR, OFERTAS_LOADING, OFERTAS_MODIFICAR, OFERTAS_TRAER, OFERTAS_TRAER_MAS, OFERTAS_TRAER_UNA, OFERTAS_UPDATE_PAGINATION } from '../../types';
import {OfertasContext} from './ofertasContext';
import OfertasReducer from './ofertasReducer';

const OfertasState = (props) => {

    const initialState = {
        loading:false,
        error:null,
        data:[],
        pagination:{
            desde:0,
            cantidad:10
        },
        oferta:null
    };

    const [state, dispatch] = useReducer(OfertasReducer, initialState);

    const traerOfertas = async()=>{
        dispatch({
            type:OFERTAS_LOADING
        })
        try {
            const res = await fetch(`${config.url}/ofertas?desde=${state.pagination.desde}&cantidad=${state.pagination.cantidad}`)
            const data = await res.json();
            return dispatch({
                type:OFERTAS_TRAER,
                payload:data.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            })
        }
    }

    const traerMasOfertas = async()=>{
        dispatch({
            type:OFERTAS_LOADING
        })
        try {
            const res = await fetch(`${config.url}/ofertas?desde=${state.pagination.desde}&cantidad=${state.pagination.cantidad}`)
            const data = await res.json();
            return dispatch({
                type:OFERTAS_TRAER_MAS,
                payload:data.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            })
        }
    }

    const traerOfertaPorId = async(id)=>{
        dispatch({
            type:OFERTAS_LOADING
        })
        try {
            const res = await fetch(`${config.url}/ofertas/${id}`)
            const data = await res.json();
            return dispatch({
                type:OFERTAS_TRAER_UNA,
                payload:data.data[0]
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            })
        }
    }

    const updatePaginacion = ()=>{
        return dispatch({
            type:OFERTAS_UPDATE_PAGINATION
        })
    }

    const agregarOferta = async (data) =>{
        dispatch({
            type:OFERTAS_LOADING
        });
        try {
            const administrador = JSON.parse(localStorage.getItem('administrador'));
            await fetch(`${config.url}/ofertas`,{
                method:'POST',
                body:data,
                headers:{'token':administrador.token}
            });
            return dispatch({
                type:OFERTAS_AGREGAR
            })
        } catch (error) {
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            })
        }
    }

    const modificarOferta = async (data,id) =>{
        dispatch({
            type:OFERTAS_LOADING
        });
        try {
            const administrador = JSON.parse(localStorage.getItem('administrador'));
            await fetch(`${config.url}/ofertas/${id}`,{
                method:'PUT',
                body:data,
                headers:{'token':administrador.token}
            });
            return dispatch({
                type:OFERTAS_MODIFICAR
            })
        } catch (error) {
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            })
        }
    }

    const agregarProducto = async (data,id)=>{
        dispatch({
            type:OFERTAS_LOADING
        });
        try {
            const administrador = JSON.parse(localStorage.getItem('administrador'));
            const headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append('token',administrador.token);
            const res = await fetch(`${config.url}/ofertas/agregarProducto/${id}`,{
                method:'POST',
                body:JSON.stringify({productos:[data]}),
                headers
            });
            if(res.status!==201){
                return dispatch({
                    type:OFERTAS_ERROR,
                    payload:res.statusText
                });
            }
            return dispatch({
                type:OFERTAS_AGREGAR_PRODUCTO
            })
        } catch (error) {
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            })
        }
    }

    const eliminarProducto = async(id)=>{
        dispatch({
            type:OFERTAS_LOADING
        });
        try {
            const administrador = JSON.parse(localStorage.getItem('administrador'));
            const headers = new Headers();
            headers.append('token',administrador.token);
            const res = await fetch(`${config.url}/ofertas/eliminarProducto/${id}`,{
                method:'DELETE',
                headers
            });
            return dispatch({
                type:OFERTAS_ELIMINAR_PRODUCTO
            })
        } catch (error) {
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            }) 
        }
    }

    const eliminarOferta = async id=>{
        dispatch({
            type:OFERTAS_LOADING
        });
        try {
            const administrador = JSON.parse(localStorage.getItem('administrador'));
            const headers = new Headers();
            headers.append('token',administrador.token);
            const res = await fetch(`${config.url}/ofertas/${id}`,{
                method:'DELETE',
                headers
            });
            return dispatch({
                type:OFERTAS_ELIMINAR
            })
        } catch (error) {
            dispatch({
                type:OFERTAS_ERROR,
                payload:error.message
            }) 
        }
    }

    return (
        <OfertasContext.Provider value={{
            loading:state.loading,
            error:state.error,
            data:state.data,
            oferta:state.oferta,
            traerOfertas,
            traerMasOfertas,
            updatePaginacion,
            agregarOferta,
            traerOfertaPorId,
            modificarOferta,
            agregarProducto,
            eliminarProducto,
            eliminarOferta
        }}>
            {props.children}
        </OfertasContext.Provider>
    );
}
 
export default OfertasState;