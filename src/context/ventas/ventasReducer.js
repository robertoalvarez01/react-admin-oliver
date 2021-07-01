import { VENTAS_ERROR, VENTAS_LOADING, VENTAS_OBTENER_ULTIMAS } from "../../types";

const ventasReducer = (state,action)=>{
    switch (action.type) {
        case VENTAS_LOADING:
            return {...state,loading:true,error:null}
        case VENTAS_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case VENTAS_OBTENER_ULTIMAS:
            return {
                ...state,
                loading:false,
                error:null,
                ultimasVentas:action.payload
            }
        default:
            return state;
    }
}

export default ventasReducer;