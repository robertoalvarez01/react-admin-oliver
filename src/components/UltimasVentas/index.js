import React from 'react';
import BoxBalance from '../BoxBalance/boxBalance';
import ListUsuarios from '../ListUsuarios';
import foto from '../../assets/user.jpg';

const UltimasVentas = () => {
    const reload = ()=>{
        alert('!!')
    }
    return (
        <ListUsuarios titulo="Últimas ventas" btnReload={true} reload={reload}>
            <BoxBalance valor={324} label="Franco Benitez" detalle="Pago aprobado" iconDetalle="fas fa-check" colorDetalle="success" avatar={foto}/>
            <BoxBalance valor={1500} label="Alejandro Martinez" detalle="Pago pendiente" iconDetalle="fas fa-exclamation" colorDetalle="warning" avatar={foto}/>
            <BoxBalance valor={389} label="Manuel Alejandro Dominguez" detalle="Pago aprobado" iconDetalle="fas fa-check" colorDetalle="success" avatar={foto}/>
            <BoxBalance valor={2600} label="Tomas Benitez" detalle="Pago aprobado" iconDetalle="fas fa-check" colorDetalle="success" avatar={foto}/>
            <BoxBalance valor={1024} label="Claudio Lopez" detalle="Pago pendiente" iconDetalle="fas fa-exclamation" colorDetalle="warning" avatar={foto}/>
            <BoxBalance valor={700} label="Maria Castillo" detalle="Pago aprobado" iconDetalle="fas fa-check" colorDetalle="success" avatar={foto}/>
        </ListUsuarios>
    );
}
 
export default UltimasVentas;