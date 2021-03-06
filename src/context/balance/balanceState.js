import React,{useReducer} from 'react';
import config from '../../config/config';
import { BALANCE_CAMBIAR_FECHA, BALANCE_CAMBIAR_FORMATO_FECHA, BALANCE_ERROR, BALANCE_LOADING, BALANCE_OBTENER_DATOS } from '../../types';
import { BalanceContext } from './balanceContext';
import balanceReducer from './balanceReducer';

const BalanceState = (props) => {

    const INITIAL_STATE = {
        loading:false,
        error:null,
        data:{
            ventas:0,
            usuarios:0,
            recaudacion:0,
            sin_stock:0
        },
        fecha:null,
        formatoFecha:'YYYY-MM-DD'
    }

    const [state, dispatch] = useReducer(balanceReducer, INITIAL_STATE);

    const traerInfo = async()=>{
        dispatch({
            type:BALANCE_LOADING
        })
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        if(!administrador){
            dispatch({
                type:BALANCE_ERROR,
                payload:{error:'No esta autenticado'}
            })
            return false;
        }

        const {token} = administrador;
        let myHeaders = new Headers();
        myHeaders.append("token", token);

        const req = await fetch(`${config.url}/estadisticas?fecha=${state.fecha}`,{
            headers:myHeaders
        });
        if(req.status !== 200){
            dispatch({
                type:BALANCE_ERROR,
                payload:{error:'Ha ocurrido un error en el servidor'}
            })
            return;
        }
        const response = await req.json();
        dispatch({
            type:BALANCE_OBTENER_DATOS,
            payload:response.info
        })
    }

    const aplicarFecha = fecha => {
        dispatch({
            type:BALANCE_CAMBIAR_FECHA,
            payload:fecha
        })
    }

    const cambiarFormatoFecha = formato =>{
        dispatch({
            type:BALANCE_CAMBIAR_FORMATO_FECHA,
            payload:formato
        })
    }

    return (
        <BalanceContext.Provider value={{
            loading:state.loading,
            error:state.error,
            data:state.data,
            fecha:state.fecha,
            formatoFecha:state.formatoFecha,
            traerInfo,
            aplicarFecha,
            cambiarFormatoFecha
        }}>
            {props.children}
        </BalanceContext.Provider>
    );
}
 
export default BalanceState;