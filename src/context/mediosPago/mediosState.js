import React,{useReducer} from 'react';
import config from '../../config/config';
import { MEDIOS_DE_PAGO_OBTENER_INFORME, MEDIOS_DE_PAGO_ERROR, MEDIOS_DE_PAGO_LOADING } from '../../types';
import { MediosContext } from './mediosContext';
import mediosReducer from './mediosReducer';

const MediosDePagoState = (props) => {

    const INITIAL_STATE = {
        loading:false,
        error:null,
        data:[],
        dataInforme:null
    }

    const [state, dispatch] = useReducer(mediosReducer, INITIAL_STATE);

    const traerDataInforme = async()=>{
        dispatch({
            type:MEDIOS_DE_PAGO_LOADING
        })
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        if(!administrador){
            dispatch({
                type:MEDIOS_DE_PAGO_ERROR,
                payload:{error:'No esta autenticado'}
            })
            return false;
        }

        const {token} = administrador;
        let myHeaders = new Headers();
        myHeaders.append("token", token);

        const req = await fetch(`${config.url}/estadisticas/informes/ventas/medios-de-pago`,{
            headers:myHeaders
        });
        if(req.status !== 200){
            dispatch({
                type:MEDIOS_DE_PAGO_ERROR,
                payload:{error:'Ha ocurrido un error en el servidor'}
            })
            return;
        }
        const response = await req.json();
        dispatch({
            type:MEDIOS_DE_PAGO_OBTENER_INFORME,
            payload:response.data[0]
        })
    }

    return (
        <MediosContext.Provider value={{
            loading:state.loading,
            error:state.error,
            data:state.data,
            dataInforme:state.dataInforme,
            traerDataInforme
        }}>
            {props.children}
        </MediosContext.Provider>
    );
}
 
export default MediosDePagoState;