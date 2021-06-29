import React,{useContext,useEffect} from 'react';
import { Route,Redirect } from "react-router-dom";
import {UsuarioContext} from '../context/usuario/usuarioContext';

const RutaPrivada = ({component:Component,...props}) => {
    const {logueado,loading,obtenerUsuario} = useContext(UsuarioContext);
    
    useEffect(() => {
        obtenerUsuario();
    }, []);

    return (
        <Route
            {...props}
            render={props=>!logueado && !loading?(
                <Redirect to="/ingresar"/>
            ):(
                <Component {...props}/>
            )}
        />
    );
}
 
export default RutaPrivada;