import { USUARIO_ERROR, USUARIO_LOADING, USUARIO_LOGIN, USUARIO_LOGOUT } from "../../types";

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
        default:
            return state;
    }
}

export default usuarioReducer;