import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import NovedadForm from '../../components/NovedadForm';
import config from '../../config/config';
import {authentication} from '../../helpers/helpers';

const Swal = require('sweetalert2');

const NuevaNovedad = (props) => {
    useEffect(() => {
        authentication();
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({
        contenido:'',
        asunto:''
    })

    const handleChange = e=>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async e=>{
        e.preventDefault();
        if(formValues.asunto.trim() === '' || formValues.contenido.trim() === ''){
            setError('Completa todos los campos');
            return false;
        }
        setError(null);
        setLoading(true);
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(formValues),
            redirect: 'follow'
        };
        const reqNovedad = await fetch(`${config.url}/usuario-oferta/sendToAll`,requestOptions);
        setLoading(false);
        if(reqNovedad.status !== 200){
            Swal.fire('Ups...','Ha ocurrido un error, intentalo más tarde.','error');
            return;
        }
        Swal.fire('Listo!','El email se ha enviado a todos sus destinatarios!','success').then(()=>{
            props.history.push('/usuarios-ofertas');
        })
    }


    return (
        <React.Fragment>
            <div className="container pt-3">
                <Link to="/usuarios-ofertas" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
                <h2>Nueva noticia</h2>
            </div>
            {(loading)?<Loader/>:
            <NovedadForm formValues={formValues} error={error} handleChange={handleChange} onSubmit={handleSubmit}/>}
        </React.Fragment>
    );
}
 
export default NuevaNovedad;