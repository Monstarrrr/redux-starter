import axios from 'axios';
import { 
    apiCallBegan, 
    apiCallSuccess, 
    apiCallError } from '../reducers/products';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== apiCallBegan.type) {
        return next(action);
    }
    
    const { 
        url, 
        productsRequested,
        productsReceived,
        productsNotReceived, 
    } = action.payload
    
    if(productsRequested) dispatch({ type: productsRequested })
    
    next(action);
    
    try {
        const {data: {products}} = await axios.request({
            baseURL: 'http://localhost:3001/api',
            url,
        });
        // apiCallSuccess
        dispatch(apiCallSuccess(products[0].tags));
        dispatch({
            type: productsReceived,
            payload: products[0].tags
        })
    } catch(error) {
        // apiCallFailed
        dispatch({ 
            type: productsNotReceived, 
            payload: error.message 
        })
        dispatch(apiCallError(error.message))
    }
};

export default api;