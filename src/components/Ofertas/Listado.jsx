import moment from 'moment';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {OfertasContext} from '../../context/ofertas/ofertasContext'
import Loader from '../Loader';

const ListadoOfertas = () => {
    const {loading,error,data,traerOfertas} = useContext(OfertasContext);
    useEffect(() => {
        traerOfertas();
    }, []);

    const deleteOferta = id=>{

    }

    if(loading){
        return <Loader/>
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        <>
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Valido hasta</th>
                        <th scope="col">
                            <Link to="/ofertas/agregar" className="btn btn-outline-success">Agregar oferta</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(oferta=>(
                        <tr key={oferta.id}>
                            <th scope="row">
                                <img style={{objectFit:'cover'}} src={oferta.foto} alt={oferta.descripcion} width={50} height={50}/>
                            </th>
                            <td>{oferta.descripcion}</td>
                            <td>{moment(oferta.validoHassta).format('DD-MM-YYYY')}</td>
                            <td>
                                <button className="btn btn-outline-danger mx-1" onClick={()=>deleteOferta(oferta.id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                                <Link className="btn btn-outline-warning mx-1" to={`/ofertas/editar/${oferta.id}`}>
                                    <i className="fas fa-pen"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length===0 ? <div className="alert alert-warning text-center">No se encontraron resultados</div>:null}
        </>
    );
}
 
export default ListadoOfertas;