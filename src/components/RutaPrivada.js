import React,{useContext,useEffect,useState} from 'react';
import { Route,Redirect } from "react-router-dom";
import {UsuarioContext} from '../context/usuario/usuarioContext';
import Loader from './Loader';

const RutaPrivada = ({component:Component,...props}) => {
    const {logueado,loading,obtenerUsuario} = useContext(UsuarioContext);
    const [chequeado, setChequeado] = useState(false);
    
    useEffect(() => {
        getUsuario();
    }, []);
    
    const getUsuario = async ()=>{
        await obtenerUsuario();
        setChequeado(true);
    }

    console.log(chequeado,loading);
    
    return (
        !chequeado ? <Loader/> :
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