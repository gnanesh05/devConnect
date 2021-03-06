import { GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "../actions/Type";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    errors: {}
};

export default function(state = initialState, action){
    const{ type, payload} = action;

    switch(type)
    {
        case UPDATE_PROFILE:
        case  GET_PROFILE:
             return{
                 ...state,
                 profile: payload,
                 loading:false
             };
        
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            };
        
        case PROFILE_ERROR:
            return{
                ...state,
                errors: payload,
                loading: false
            };
        
        case GET_REPOS:
            return{
                ...state,
                repos: payload,
                loading: false
            };

        

        default:
            return state;
    }
}