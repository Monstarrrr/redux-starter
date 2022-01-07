import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { cacheExpired } from '../config/caching';

/**
 * Reducers
 */

let lastId = 0;
// createSlice makes mutable code immutable
const slice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        productsRequested: (products, action) => {
            products.loading = true;
        },
        productsReceived: (products, action) => {
            products.list = action.payload.data;
            products.loading = false;
            products.lastFetch = Date.now();
        },
        productsNotReceived: (products, action) => {
            products.loading = false;
        },
        productAdded: (products, action) => {
            products.list.push(action.payload)
        },
    }
})
export const { 
    productAdded, 
    productsReceived,
    productsNotReceived,
    productsRequested,
} = slice.actions;

export default slice.reducer;

/**
 * Action Creators
 */

export const apiCallBegan = createAction("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallError = createAction("api/CallError");

const urlLoadProducts = "/products"
const urlAddProduct = "/auth/data"

export const loadProducts = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.products;
    
    // Caching
    if(!cacheExpired(lastFetch)) return;
    
    dispatch(apiCallBegan({
        url: urlLoadProducts,
        method: "get",
        onStart: productsRequested.type,
        onSuccess: productsReceived.type,
        onError: productsNotReceived.type,
    }));
};

export const addProduct = product => dispatch => {
    dispatch(apiCallBegan({
        url: urlAddProduct,
        method: "post",
        data: product,
        onSuccess: productAdded.type,
        onError: productAdded.type,
    }))
}

/**
 * Selectors
 */

// Selector without memoization
export const getUnresolvedProductsNormal = state => {
    state.entities.products.list.filter(
        product => !product.resolved
    );
}

// Selector with memoization
export const getUnresolvedProductsMemoized = createSelector(
    state => state.entities.products,
    products => products.list.filter(product => !product.resolved)
);
export const getUserProducts = userId => createSelector(
    state => state.entities.products.list,
    products => products.list.filter(product => product.id === userId)
);