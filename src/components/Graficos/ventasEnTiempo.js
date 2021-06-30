import React from 'react';
import Chart from "react-google-charts";
import Loader from '../Loader';

const VentasEnTiempo = () => {
    return (
        <Chart
            height={'300px'}
            chartType="LineChart"
            loader={<Loader/>}
            data={[
                ['Mes', 'Recaudación'],
                ['Enero', 37],
                ['Febrero', 19.5],
                ['Marzo', 52],
                ['Abril', 22],
                ['Mayo', 16.5],
                ['Junio', 32.8]
            ]}
            options={{
                hAxis: {
                  title: 'Meses',
                },
                vAxis: {
                  title: 'Recaudación',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
}
 
export default VentasEnTiempo;