import React, {useContext, useEffect} from 'react';
import BoxBalance from '../BoxBalance/boxBalance';
import ListUsuarios from '../ListUsuarios';
import Loader from '../Loader';
import { VentasContext } from "../../context/ventas/ventasContext";

const UltimasVentas = () => {
    const {loading,error,ultimasVentas,traerUltimas} = useContext(VentasContext);

    useEffect(() => {
        traerUltimas();
    }, [])

    const reload = ()=>{
        traerUltimas();
    }

    return (
        <ListUsuarios titulo="Últimas ventas" btnReload={true} reload={reload}>
            {loading || !ultimasVentas.length ? <Loader/> : <>
                {ultimasVentas.map(venta=>(
                    <BoxBalance key={venta.idVenta} valor={venta.total} label={venta.nombre} detalle={venta.pagado==1 ? 'Pago aprobado' : 'Pago pendiente'} iconDetalle={venta.pagado==1 ? 'fas fa-check' : 'fas fa-exclamation'} colorDetalle={venta.pagado==1 ? 'success' : 'warning'} avatar={venta.foto}/>
                ))}
            </>}
        </ListUsuarios>
    );
}
 
export default UltimasVentas;