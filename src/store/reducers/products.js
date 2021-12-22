import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

// createSlice: mutable code is treated as immutable
const slice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        addProduct: (products, action) => {
            products.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
    }
})

export const { addProduct } = slice.actions;
export default slice.reducer;

/**
 * Selectors
 */

// Selector
export const getUnresolvedproductsNormal = state => state.entities.products.list.filter(product => !product.resolved);

// Selector with memoization
export const getUnresolvedproductsMemoized = createSelector(
    state => state.entities.products,
    products => products.list.filter(product => !product.resolved)
);
export const getUserproducts = userId => createSelector(
    state => state.entities.products.list,
    products => products.list.filter(product => product.id === userId)
);