import React, { useEffect, useState } from 'react';
import config from '../config/config';
import {getData} from '../helpers/helpers';
import './style/FiltrosEnvio.css';

const FiltrosEnvio = (props) => {
    const [zonas, setZonas] = useState([]);
    const [tipoEnvio, setTipoEnvio] = useState([
        {tipo:'Domicilio'},
        {tipo:'Express'},
        {tipo:'Local'}
    ]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getZonas();
    }, [])

    const getZonas = async()=>{
        try {
            setLoading(true);
            const data = await getData(`${config.url}/zonas`);
            setLoading(false)
            return setZonas(data.data);
        } catch (error) {
            setError(error)
        }
    }

    const mostrarFiltros = ()=>{
        document.getElementById('formFiltroEnvios').classList.add('show');
        document.getElementById('btn-mostrarFiltro').classList.add('d-none');
    }

    return (
        (loading)?null:
        <>
            <button id="btn-mostrarFiltro" className="btn btn-warning" onClick={mostrarFiltros}>Filtrar</button>
            <form onSubmit={props.filtrarEnvios} id="formFiltroEnvios">
                <div className="row mt-3">
                    <section className="filtro-tipo col-12 col-md-3 d-flex align-items-center">
                        <label className="my-0 mr-2">Envío: </label>
                        <select className="form-control" name="tipo" defaultValue={props.filtros.tipo} onChange={props.aplicarFiltro}>
                            <option value="">Todos</option>
                            {tipoEnvio.map((te,key)=>(
                                <option key={key} value={te.tipo}>{te.tipo}</option>
                            ))}
                        </select>
                    </section>
                    <section className="filtro-zona col-12 col-md-3 d-flex align-items-center">
                        <label className="my-0 mr-2">Zona</label>
                        <select className="form-control" name="idZona" defaultValue={props.filtros.idZona} onChange={props.aplicarFiltro}>
                            <option value="">Todas</option>
                            {zonas.map((zona,key)=>(
                                <option key={key} value={zona.idZona}>{zona.zona}</option>
                            ))}
                        </select>
                    </section>
                    <section className="filtro-zona col-12 col-md-4 d-flex align-items-center">
                        <label className="my-0 mr-2">Cód. Envío</label>
                        <input type="text" className="form-control" name="idEnvio" value={props.filtros.idEnvio} onChange={props.aplicarFiltro}/>
                    </section>
                    <div className="col-12 col-md-2 text-right">
                        <button type="submit" className="btn btn-info">Aplicar filtro</button>
                    </div>
                </div>
            </form>
        </> 
    );
}
 
export default FiltrosEnvio;