import { OFERTAS_AGREGAR, OFERTAS_AGREGAR_PRODUCTO, OFERTAS_ELIMINAR, OFERTAS_ELIMINAR_PRODUCTO, OFERTAS_ERROR, OFERTAS_LOADING, OFERTAS_MODIFICAR, OFERTAS_TRAER, OFERTAS_TRAER_MAS, OFERTAS_TRAER_UNA, OFERTAS_UPDATE_PAGINATION } from "../../types";

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
                data:action.payload,
                oferta:null
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
        case OFERTAS_MODIFICAR:
        case OFERTAS_ELIMINAR:
            return {
                ...state,
                loading:false,
                error:null,
                pagination:{
                   desde:0,
                   cantidad:10 
                }
            }
        case OFERTAS_TRAER_UNA:
            return{
                ...state,
                loading:false,
                error:null,
                oferta:action.payload
            }
        case OFERTAS_AGREGAR_PRODUCTO:
        case OFERTAS_ELIMINAR_PRODUCTO:
            return{
                ...state,
                loading:false,
                error:null
            }
        default:
            return state;
    }
}
 
export default OfertasReducer;