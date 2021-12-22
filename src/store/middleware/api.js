import axios from 'axios';
import * as actions from '../config/api';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) {
        return next(action);
    }
    
    next(action);
    
    const { url, getProductsSuccess, getProductsFailed } = action.payload
    
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:3001/api',
            url,
        });
        // Specific
        dispatch({ type: getProductsSuccess, payload: response.data })
        // General
        // dispatch(actions.apiCallSuccess(response.data));
    } catch(error) {
        // Specific
        dispatch({ type: getProductsFailed, payload: error.message })
        // General
        // dispatch(actions.apiCallFailed(error.message))
    }
};

export default api;