import { MARCAS_APLICAR_AUMENTO, MARCAS_ERROR, MARCAS_LOADING, MARCAS_TRAER_TODAS } from "../../types";

const marcasReducer = (state,action)=>{
    switch (action.type) {
        case MARCAS_LOADING:
            return {...state,loading:true,error:null}
        case MARCAS_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case MARCAS_TRAER_TODAS:
            return {
                ...state,
                loading:false,
                error:null,
                data:action.payload
            }
        case MARCAS_APLICAR_AUMENTO:
            return {
                ...state,
                loading:false,
                error:null
            }
        default:
            return state;
    }
}

export default marcasReducer;