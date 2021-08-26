import { OFERTAS_AGREGAR, OFERTAS_ERROR, OFERTAS_LOADING, OFERTAS_TRAER, OFERTAS_TRAER_MAS, OFERTAS_UPDATE_PAGINATION } from "../../types";

const OfertasReducer = (state,action) => {
    switch (action.type) {
        case OFERTAS_LOADING:
            return {
                ...state,
                loading:true,
                error:false
            };
        case OFERTAS_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case OFERTAS_TRAER:
            return {
                ...state,
                loading:false,
                error:null,
                data:action.payload
            }
        case OFERTAS_TRAER_MAS:
            return {
                ...state,
                loading:false,
                error:null,
                data:[...state.data,action.payload]
            }
        case OFERTAS_UPDATE_PAGINATION:
            return {
                ...state,
                pagination:{
                    ...state.pagination,
                    desde:state.pagination.desde + 10
                }
            }
        case OFERTAS_AGREGAR:
            return {
                ...state,
                loading:false,
                error:null,
                pagination:{
                   desde:0,
                   cantidad:10 
                }
            }
        default:
            return state;
    }
}
 
export default OfertasReducer;