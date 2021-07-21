import axios from 'axios';
import { setAlert } from './alert';
import{
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE

} from '../actions/Type';

import setToken from "../utils/setToken";

//load user

export const loadUser = ()=> async dispatch =>{
    if(localStorage.token)
      setToken(localStorage.token)
    
    try {
        const res = await axios.get('/api/auth');
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//register user
export const register =({name,email,password}) => async dispatch =>{
    const config= {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name,email,password});

    try{
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    }
    catch(err)
    {
        const errors = err.response.data.errors;
        
        if(errors)
        {
            errors.forEach(error=>{
                 dispatch(setAlert(error.msg,'danger'))
                });
        }
        dispatch({
            type: REGISTER_FAILURE,

        });
    }
}

//login user
export const login =(email,password) => async dispatch =>{
    const config= {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email,password});

    try{
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    }
    catch(err)
    {
        const errors = err.response.data.errors;
        
        if(errors)
        {
            errors.forEach(error=>{
                 dispatch(setAlert(error.msg,'danger'))
                });
        }
        dispatch({
            type: LOGIN_FAILURE,

        });

       
    }
}