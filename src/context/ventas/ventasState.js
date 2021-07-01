import React,{useReducer} from 'react';
import config from '../../config/config';
import { VENTAS_OBTENER_ULTIMAS, VENTAS_ERROR, VENTAS_LOADING } from '../../types';
import { VentasContext } from './ventasContext';
import ventasReducer from './ventasReducer';

const VentasState = (props) => {

    const INITIAL_STATE = {
        loading:false,
        error:null,
        ultimasVentas:[],
        ventas:[],
        cantidad:6
    }

    const [state, dispatch] = useReducer(ventasReducer, INITIAL_STATE);

    const traerUltimas = async()=>{
        dispatch({
            type:VENTAS_LOADING
        })
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        if(!administrador){
            dispatch({
                type:VENTAS_ERROR,
                payload:{error:'No esta autenticado'}
            })
            return false;
        }

        const {token} = administrador;
        let myHeaders = new Headers();
        myHeaders.append("token", token);

        const req = await fetch(`${config.url}/estadisticas/ultimas-ventas?cantidad=${state.cantidad}`,{
            headers:myHeaders
        });
        if(req.status !== 200){
            dispatch({
                type:VENTAS_ERROR,
                payload:{error:'Ha ocurrido un error en el servidor'}
            })
            return;
        }
        const response = await req.json();
        dispatch({
            type:VENTAS_OBTENER_ULTIMAS,
            payload:response.ventas
        })
    }

    return (
        <VentasContext.Provider value={{
            loading:state.loading,
            error:state.error,
            ultimasVentas:state.ultimasVentas,
            ventas:state.ventas,
            cantidad:state.cantidad,
            traerUltimas
        }}>
            {props.children}
        </VentasContext.Provider>
    );
}
 
export default VentasState;