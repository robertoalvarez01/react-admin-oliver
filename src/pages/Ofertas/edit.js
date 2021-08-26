import React, {useEffect,useContext} from 'react';
import Swal from 'sweetalert2';
import {OfertasContext} from '../../context/ofertas/ofertasContext';
import Loader from '../../components/Loader';
import FormOferta from '../../components/Ofertas/Form';
import { useHistory } from 'react-router-dom';

const EditarOferta = (props) => {
    const {loading,error,oferta,traerOfertaPorId} = useContext(OfertasContext);
    const history = useHistory();

    useEffect(() => {
        traerOfertaPorId(props.match.params.id);
    }, [])

    if(loading){
        return <Loader/>
    }

    if(error){
        Swal.fire('error',error,'error');
    }
    if(!oferta){
        return null;
    }
    return (
        <div className="container mt-4">
            <button type="button" className="btn btn-warning mb-3" onClick={()=>history.goBack()}>Volver</button>
            <h2>Detalle de la oferta</h2>
            <FormOferta/>
        </div>
    );
}
 
export default EditarOferta;