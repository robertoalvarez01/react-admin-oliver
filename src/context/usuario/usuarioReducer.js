import { USUARIO_ERROR, USUARIO_LOADING, USUARIO_LOGIN, USUARIO_LOGOUT, USUARIO_SESION_VENCIDA } from "../../types";

const usuarioReducer = (state,action)=>{
    switch (action.type) {
        case USUARIO_LOADING:
            return {
                ...state,
                loading:true,
                error:false
            }
        case USUARIO_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case USUARIO_LOGIN:
            return {
                ...state,
                loading:false,
                error:null,
                usuario:action.payload,
                logueado:true
            }
        case USUARIO_LOGOUT:
            return {
                ...state,
                loading:false,
                error:null,
                logueado:false,
                usuario:null
            }
        case USUARIO_SESION_VENCIDA:
            return {
                ...state,
                loading:false,
                logueado:false
            }
        default:
            return state;
    }
}

export default usuarioReducer;