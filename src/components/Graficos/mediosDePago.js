import React, {useContext, useEffect} from 'react';
import Chart from "react-google-charts";
import Loader from '../Loader';
import { MediosContext } from "../../context/mediosPago/mediosContext";

const GraficoMediosDePago = () => {
    
    const {dataInforme,traerDataInforme} = useContext(MediosContext);

    useEffect(() => {
        traerDataInforme();
    }, [])

    return (
        !dataInforme ? <Loader/> :
        <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<Loader/>}
            data={[
                ['Task', 'Hours per Day'],
                ['Mercado pago', dataInforme.mercado_pago],
                ['Efectivo', dataInforme.efectivo]
            ]}
            options={{
                title: 'Venta por medio',
                // Just add this option
                is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    );
}
 
export default GraficoMediosDePago;