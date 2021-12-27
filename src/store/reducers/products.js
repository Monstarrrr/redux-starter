import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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
            products.list = action.payload;
            products.loading = false;
            products.lastFetch = Date.now();
        },
        productsNotReceived: (products, action) => {
            products.loading = false;
        },
        addProduct: (products, action) => {
            products.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
    }
})
export const { 
    addProduct, 
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

const url = "/products"

export const loadProducts = () => apiCallBegan({
    url,
    productsRequested: productsRequested.type,
    productsReceived: productsReceived.type,
    productsNotReceived: productsNotReceived.type,
})

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