import React, { useReducer } from 'react';
import config from '../../config/config';
import { OFERTAS_AGREGAR, OFERTAS_ERROR, OFERTAS_LOADING, OFERTAS_TRAER, OFERTAS_TRAER_MAS, OFERTAS_UPDATE_PAGINATION } from '../../types';
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
        }
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

    return (
        <OfertasContext.Provider value={{
            loading:state.loading,
            error:state.error,
            data:state.data,
            traerOfertas,
            traerMasOfertas,
            updatePaginacion,
            agregarOferta
        }}>
            {props.children}
        </OfertasContext.Provider>
    );
}
 
export default OfertasState;