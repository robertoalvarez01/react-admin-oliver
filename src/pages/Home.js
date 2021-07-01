import React from 'react';
import BoxBalance from '../components/BoxBalance/boxBalance';
import Calendario from '../components/Calendario/Calendario';
import UltimasVentas from '../components/UltimasVentas';
import Loader from '../components/Loader';
import { useContext } from 'react';
import {UsuarioContext} from '../context/usuario/usuarioContext';
import BotonCircle from '../components/BotonCircle';
import GraficoMediosDePago from '../components/Graficos/mediosDePago';
import VentasEnTiempo from '../components/Graficos/ventasEnTiempo';

const Home = () => {
  const {usuario} = useContext(UsuarioContext);
  return (
    !usuario ? <Loader/> :
    <div className="container mt-2 mb-5">
        <h2>Hola, {usuario.nombre}</h2>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <BoxBalance valor={23} label="ventas" icon="fas fa-money-bill-alt"/>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <BoxBalance valor={10} label="Usuarios" icon="fas fa-users"/>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <BoxBalance valor={13500} label="Recaudación hoy" icon="fas fa-cash-register"/>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <BoxBalance valor={16} label="Sin stock" icon="fas fa-exclamation"/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-12 col-md-8 my-2">
            <VentasEnTiempo/>
          </div>
          <div className="col-12 col-md-4 my-2">
            <GraficoMediosDePago/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-12 col-sm-6">
            <Calendario/>
          </div>
          <div className="col-12 col-sm-6">
            <UltimasVentas/>
          </div>
        </div>
        <br/>
        <div className="row text-center">
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-arrow-circle-up" value="Aumentos masivos" color="success"/>
          </div>
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-truck" value="Estado de mis envíos" color="success"/>
          </div>
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-plus" value="Nuevo producto" color="success"/>
          </div>
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-credit-card" value="Nuevo medio de pago" color="success"/>
          </div>
        </div>
        <br/>
    </div>
  );
}
 
export default Home;

