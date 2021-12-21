import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) {
        return next(action);
    }
    
    next(action);
    
    const { url, method } = action.payload
    
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:3001/api',
            url,
            method
        });
        dispatch(actions.apiCallSuccess(response.data));
    } catch(error) {
        dispatch(actions.apiCallFailed("error"))
    }
};

export default api;