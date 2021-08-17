import axios from 'axios';
import { setAlert } from "./alert";

import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from "./Type";


export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

//create or update

export const createProfile = (FormData, history, edit=false) => async dispatch=>{
    try {
        const config={
            
            headers:{
                'Content-Type' : 'application/json',
            }
        }

        const res = await axios.post('/api/profile',FormData,config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'));

        if(!edit)
        {
            history.push('/dashboard');
        }
    } catch (error) {
        
        const errors = error.response.data.errors;
        
        if(errors)
        {
            errors.forEach(error=>{
                 dispatch(setAlert(error.msg,'danger'))
                });

                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: error.response.statusText, status: error.response.status}
                });
        }
    }
}

//ADD EXPEREINCE

export const addExperience = (FormData, history) => async dispatch =>{

    try {
        const config={
            
            headers:{
                'Content-Type' : 'application/json',
            }
        }

        const res = await axios.put('/api/profile/experience',FormData,config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

       
            history.push('/dashboard');

    } catch (error) {
        
        const errors = error.response.data.errors;
        
        if(errors)
        {
            errors.forEach(error=>{
                 dispatch(setAlert(error.msg,'danger'))
                });

                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: error.response.statusText, status: error.response.status}
                });
        }
    }
}

//ADD EDUCATION

export const addEducation = (FormData, history) => async dispatch =>{

    try {
        const config={
            
            headers:{
                'Content-Type' : 'application/json',
            }
        }

        const res = await axios.put('/api/profile/education',FormData,config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

       
            history.push('/dashboard');

    } catch (error) {
        
        const errors = error.response.data.errors;
        
        if(errors)
        {
            errors.forEach(error=>{
                 dispatch(setAlert(error.msg,'danger'))
                });

                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: error.response.statusText, status: error.response.status}
                });
        }
    }
}