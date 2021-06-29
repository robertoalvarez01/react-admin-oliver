import { UsuarioContext } from "./usuarioContext";
import usuarioReducer from "./usuarioReducer";
import React,{useReducer} from 'react';
import { USUARIO_ERROR, USUARIO_LOADING, USUARIO_LOGIN, USUARIO_LOGOUT } from "../../types/index";
import config from "../../config/config";

const UsuarioState = (props) => {

    const INITIAL_STATE = {
        loading:false,
        error:null,
        usuario:null,
        logueado:false
    }

    const [state, dispatch] = useReducer(usuarioReducer, INITIAL_STATE);

    const login = async data=>{
        dispatch({
            type:USUARIO_LOADING
        })
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("email", data.email);
        urlencoded.append("password", data.password);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
    
        const req = await fetch(`${config.url}/login`, requestOptions);
        const response = await req.json();
        if(response.ok && response.usuario.admin === 1){
            localStorage.setItem('administrador',JSON.stringify(response.usuario))
            return dispatch({
                type:USUARIO_LOGIN,
                payload:response.usuario
            })
        }
        return dispatch({
            type:USUARIO_ERROR,
            payload:response
        })
    }

    const verificarSesion = ()=>{
        dispatch({
            type:USUARIO_LOADING
        })
        const usuario = JSON.parse(localStorage.getItem('administrador'));
        if(!usuario){
            return false;
        }
        dispatch({
            type:USUARIO_LOGIN,
            payload:usuario
        })
    }

    const logout = ()=>{
        localStorage.removeItem('administrador');
        dispatch({
            type:USUARIO_LOGOUT
        })
    }

    return (
        <UsuarioContext.Provider 
            value={{
                loading:state.loading,
                error:state.error,
                usuario:state.usuario,
                logueado:state.logueado,
                login,
                verificarSesion,
                logout
            }}>
            {props.children}
        </UsuarioContext.Provider>
    );
}
 
export default UsuarioState;