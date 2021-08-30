import moment from 'moment';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {OfertasContext} from '../../context/ofertas/ofertasContext'
import Loader from '../Loader';

const ListadoOfertas = () => {
    const {loading,error,data,traerOfertas,eliminarOferta,cambiarEstado} = useContext(OfertasContext);
    useEffect(() => {
        traerOfertas();
    }, []);

    const deleteOferta = id=>{
        Swal.fire({
            title: '¿Seguro quieres eliminar la oferta?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await eliminarOferta(id);
                Swal.fire(
                    'Eliminado',
                    'Recurso eliminado',
                    'success'
                ).then(()=>traerOfertas());
            }
        });
    }

    if(loading){
        return <Loader/>
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    const handleChangeEstado = async id=>{
        await cambiarEstado(id);
        traerOfertas();
    }

    return (
        <>
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Valido hasta</th>
                        <th scope="col">Activo</th>
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
                            <td>{oferta.titulo}</td>
                            <td>{moment(oferta.validoHasta).format('DD-MM-YYYY')}</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" checked={oferta.activo} onChange={e=>handleChangeEstado(oferta.id)}/>
                                    <span className="slider round"></span>
                                </label>
                            </td>
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