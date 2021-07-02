import { MEDIOS_DE_PAGO_ERROR, MEDIOS_DE_PAGO_LOADING, MEDIOS_DE_PAGO_OBTENER_INFORME } from "../../types";

const mediosDePagoReducer = (state,action)=>{
    switch (action.type) {
        case MEDIOS_DE_PAGO_LOADING:
            return {...state,loading:true,error:null}
        case MEDIOS_DE_PAGO_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case MEDIOS_DE_PAGO_OBTENER_INFORME:
            return {
                ...state,
                loading:false,
                error:null,
                dataInforme:action.payload
            }
        default:
            return state;
    }
}

export default mediosDePagoReducer;