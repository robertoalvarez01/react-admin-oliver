import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import NovedadForm from '../../components/NovedadForm';
//import config from '../../config/config';
import {authentication,getData} from '../../helpers/helpers';
const NuevaNovedad = () => {
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

    const handleSubmit = e=>{
        e.preventDefault();
        if(formValues.asunto.trim() === '' || formValues.contenido.trim() === ''){
            setError('Completa todos los campos');
            return false;
        }
        return;
    }


    return (
        <React.Fragment>
            <div className="container pt-3">
                <Link to="/usuarios-ofertas" className="mb-2 btn btn-outline-danger float">Volver al listado</Link>
                <h2>Nueva noticia</h2>
            </div>
            {(loading)?<Loader/>:
            <NovedadForm formValues={formValues} handleChange={handleChange} onSubmit={handleSubmit}/>}
        </React.Fragment>
    );
}
 
export default NuevaNovedad;