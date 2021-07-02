import React, { useState } from 'react';
import BoxBalance from '../components/BoxBalance/boxBalance';
import Calendario from '../components/Calendario/Calendario';
import UltimasVentas from '../components/UltimasVentas';
import Loader from '../components/Loader';
import { useContext } from 'react';
import {UsuarioContext} from '../context/usuario/usuarioContext';
import { BalanceContext } from "../context/balance/balanceContext";
import BotonCircle from '../components/BotonCircle';
import GraficoMediosDePago from '../components/Graficos/mediosDePago';
import VentasEnTiempo from '../components/Graficos/ventasEnTiempo';
import FormFormatoFecha from '../components/FormFormatoFecha';
import Modal from '../components/Modal';
import FormAumento from '../components/FormAumento/FormAumento';

const Home = () => {

  const {usuario} = useContext(UsuarioContext);
  const {data:{recaudacion,ventas,usuarios,sin_stock},loading} = useContext(BalanceContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const switchModal = ()=>{
    setModalIsOpen(!modalIsOpen);
  }

  return (
    !usuario ? <Loader/> :
    <div className="container mt-2 mb-5">

        <div className="d-flex justify-content-between align-items-center">
          <h2>Hola, {usuario.nombre}</h2>
          <FormFormatoFecha/>
        </div>
      
      
        <div className="row"> 
          {loading ? <div className="text-center"><Loader/></div> : 
            <>
              <div className="col-12 col-sm-6 col-md-3">
                <BoxBalance valor={ventas} label="ventas" icon="fas fa-money-bill-alt"/>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <BoxBalance valor={usuarios} label="Nuevos usuarios" icon="fas fa-users"/>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <BoxBalance valor={recaudacion ? recaudacion : 0} label="Recaudación" icon="fas fa-cash-register"/>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <BoxBalance valor={sin_stock} label="Sin stock" icon="fas fa-exclamation"/>
              </div>
            </>
          }
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
        
        <div className="row">
          <div className="col-12 col-md-8 my-2">
            <VentasEnTiempo/>
          </div>
          <div className="col-12 col-md-4 my-2">
            <GraficoMediosDePago/>
          </div>
        </div>
        <br/>
        <div className="row text-center">
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-arrow-circle-up" value="Aumentos masivos" color="success" action={switchModal}/>
          </div>
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-truck" value="Estado de mis envíos" color="success" link="/envios"/>
          </div>
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-plus" value="Nuevo producto" color="success" link="/producto/agregar"/>
          </div>
          <div className="col-6 col-md-3">
            <BotonCircle icon="fas fa-credit-card" value="Nuevo medio de pago" color="success" link="/medios-de-pago"/>
          </div>
        </div>
        <br/>
        {modalIsOpen ? <Modal closeModal={switchModal}>
          <FormAumento/>
        </Modal> : null}
    </div>
  );
}
 
export default Home;

