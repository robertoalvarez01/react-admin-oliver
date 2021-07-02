import React,{useReducer} from 'react';
import config from '../../config/config';
import { MARCAS_APLICAR_AUMENTO, MARCAS_ERROR, MARCAS_LOADING, MARCAS_TRAER_TODAS } from '../../types';
import { MarcasContext } from './marcasContext';
import marcasReducer from './marcasReducer';

const MarcasState = (props) => {

    const INITIAL_STATE = {
        loading:false,
        error:null,
        data:[]
    }

    const [state, dispatch] = useReducer(marcasReducer, INITIAL_STATE);

    const traerTodas = async()=>{
        dispatch({
            type:MARCAS_LOADING
        })
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        if(!administrador){
            dispatch({
                type:MARCAS_ERROR,
                payload:{error:'No esta autenticado'}
            })
            return false;
        }

        const {token} = administrador;
        let myHeaders = new Headers();
        myHeaders.append("token", token);

        const req = await fetch(`${config.url}/marca`,{
            headers:myHeaders
        });
        if(req.status !== 200){
            dispatch({
                type:MARCAS_ERROR,
                payload:{error:'Ha ocurrido un error en el servidor'}
            })
            return;
        }
        const response = await req.json();
        dispatch({
            type:MARCAS_TRAER_TODAS,
            payload:response.data
        })
    }

    const aplicarAumento = async data =>{
        dispatch({
            type:MARCAS_LOADING
        });
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        if(!administrador){
            dispatch({
                type:MARCAS_ERROR,
                payload:{error:'No esta autenticado'}
            })
            return false;
        }

        const {token} = administrador;
        let myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append('Content-Type','application/json');

        const req = await fetch(`${config.url}/aumentos/subproducto/marca`,{
            headers:myHeaders,
            method:'PUT',
            body:JSON.stringify(data)
        });
        if(req.status !== 200){
            return dispatch({
                type:MARCAS_ERROR,
                payload:{error:'Ha ocurrido un error en el servidor'}
            })
        }
        return dispatch({
            type:MARCAS_APLICAR_AUMENTO
        })
    }

    return (
        <MarcasContext.Provider value={{
            loading:state.loading,
            error:state.error,
            data:state.data,
            traerTodas,
            aplicarAumento
        }}>
            {props.children}
        </MarcasContext.Provider>
    );
}
 
export default MarcasState;