import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
    DELETE_ACCOUNT
}from "../actions/Type";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
};


export default function(state = initialState, action){
 const {type, payload} = action;

 switch(type){
     case REGISTER_SUCCESS:
         localStorage.setItem('token', payload.token);
         return{
             ...state,
             ...payload,
             isAuthenticated: true,
             loading: false
         }
    
     case REGISTER_FAILURE:

        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }

    case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
        }
    
    case AUTH_ERROR:
        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }

    case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
         return{
             ...state,
             ...payload,
             isAuthenticated: true,
             loading: false
         }
    
    case DELETE_ACCOUNT:
    case LOGOUT:
    case LOGIN_FAILURE:
        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }

    case CLEAR_PROFILE:
        return{
            ...state,
            profile: null,
            repos: [],
            loading: false

        } 

    default: return state;

 }
}