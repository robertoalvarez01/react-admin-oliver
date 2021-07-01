import { BALANCE_ERROR, BALANCE_LOADING, BALANCE_OBTENER_DATOS } from "../../types";

const balanceReducer = (state,action)=>{
    switch (action.type) {
        case BALANCE_LOADING:
            return {...state,loading:true,error:null}
        case BALANCE_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case BALANCE_OBTENER_DATOS:
            return {
                ...state,
                loading:false,
                error:null,
                data:{
                    ventas:action.payload.ventas,
                    usuarios:action.payload.nuevos_usuarios,
                    recaudacion:action.payload.recaudacion,
                    sin_stock:action.payload.sin_stock
                }
            }
        default:
            return state;
    }
}

export default balanceReducer;