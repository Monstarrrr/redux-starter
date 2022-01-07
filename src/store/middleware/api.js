import axios from 'axios';
import { 
    apiCallBegan, 
    apiCallSuccess, 
    apiCallError 
} from '../reducers/products';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== apiCallBegan.type) {
        return next(action);
    }
    const { 
        url,
        method,
        data,
        onStart,
        onSuccess,
        onError, 
    } = action.payload
    
    if(onStart) dispatch({ type: onStart })
    
    next(action);
    
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:3001/api',
            url,
            method,
            data
        });
        // apiCallSuccess
        dispatch(apiCallSuccess(response.data));
        dispatch({
            type: onSuccess,
            payload: response.data
        })
    } catch(error) {
        // apiCallFailed
        dispatch(apiCallError(error.message))
        dispatch({ 
            type: onError, 
            payload: error.message 
        })
    }
};

export default api;