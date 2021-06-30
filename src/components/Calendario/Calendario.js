import React, { useState } from 'react';
// import MomentUtils from '@date-io/moment';
import { DatePicker } from "@material-ui/pickers";

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = e =>{
        console.log(e);
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