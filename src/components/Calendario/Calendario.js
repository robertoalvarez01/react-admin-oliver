import React, { useState, useContext, useEffect } from 'react';
import { DatePicker } from "@material-ui/pickers";
import {BalanceContext} from '../../context/balance/balanceContext';
import moment from 'moment';

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {formatoFecha,fecha,aplicarFecha,traerInfo} = useContext(BalanceContext);

    //loop para setear la fecha que tiene el picker en el store del balance
    useEffect(() => {
        aplicarFecha(moment(selectedDate).format(formatoFecha))
    }, [])

    //loop para cuando se cambia el formato de fecha en el store, cambiar tambien la fecha guardada en el store y aplicar el formato actualizado.
    useEffect(() => {
        if(fecha){
            aplicarFecha(moment(selectedDate).format(formatoFecha))
        }
    }, [formatoFecha])

    //loop para cuando cambia la fecha del store, actualizar info en pantalla
    useEffect(() => {
        if(fecha){
            traerInfo();
        }
    }, [fecha]) 

    const handleChange = e =>{
        let fechaMoment = moment(e._d).format(formatoFecha);
        aplicarFecha(fechaMoment);
        setSelectedDate(e._d)
    }

    return (
        <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={selectedDate}
            onChange={handleChange}
        />
    );
}
 
export default Calendario;