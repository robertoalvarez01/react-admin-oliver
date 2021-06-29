import React, { useEffect, useState } from 'react';
import UsuarioOfertaList from '../../components/UsuarioOfertaList';
import Loader from '../../components/Loader';
import config from '../../config/config';
import {getData} from '../../helpers/helpers';

const UsuarioOferta = () => {
    useEffect(() => {
        getUsuarios();
    }, []);

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const getUsuarios = async()=>{
      try {
        setLoading(true);
        let url = `${config.url}/usuario-oferta`;
        const data = await getData(url);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message)
      }
    }

    return (
        <React.Fragment>
            <div className="container pt-3">
                <h2>Listado de usuarios</h2>
            </div>
            {(loading)?<Loader/>:
            <UsuarioOfertaList usuarios={data}/>}
        </React.Fragment>
    );
}
 
export default UsuarioOferta;