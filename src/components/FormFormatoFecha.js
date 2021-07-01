import React, {useContext, useEffect, useState} from 'react';
import { BalanceContext } from "../context/balance/balanceContext";

const FormFormatoFecha = () => {
    const [value, setValue] = useState('');
    const {formatoFecha,cambiarFormatoFecha} = useContext(BalanceContext)

    useEffect(() => {
        setValue(formatoFecha);
    }, [])

    const handleChange = e =>{
        setValue(e.target.value);
        cambiarFormatoFecha(e.target.value);
    }

    return (
        value=="" ? null :
        <select className="form-control" style={{width:'250px'}} defaultValue={value} onChange={handleChange}>
            <option value="YYYY-MM-DD">Datos del día</option>
            <option value="YYYY-MM">Datos del mes</option>
        </select>
    );
}
 
export default FormFormatoFecha;