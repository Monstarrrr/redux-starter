import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

// createSlice: mutable code is treated as immutable
const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        addBug: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        resolveBug: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true
        },
        assignBugToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        }
    }
})

export const { addBug, resolveBug, assignBugToUser } = slice.actions;
export default slice.reducer;

/**
 * Selectors
 */

// Selector
export const getUnresolvedBugsNormal = state => state.entities.bugs.list.filter(bug => !bug.resolved);

// Selector with memoization
export const getUnresolvedBugsMemoized = createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => !bug.resolved)
);
export const getUserBugs = userId => createSelector(
    state => state.entities.bugs.list,
    bugs => bugs.list.filter(bug => bug.id === userId)
);