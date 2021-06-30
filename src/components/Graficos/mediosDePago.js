import React from 'react';
import Chart from "react-google-charts";
import Loader from '../Loader';

const GraficoMediosDePago = () => {
    return (
        <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<Loader/>}
            data={[
                ['Task', 'Hours per Day'],
                ['Mercado pago', 11],
                ['Efectivo', 4]
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