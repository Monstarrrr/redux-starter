import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        addBug: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        resolveBug: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id)
            bugs[index].resolved = true
        },
        assignBugToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugId);
            bugs[index].userId = userId;
        }
    }
})

export const { addBug, resolveBug, assignBugToUser } = slice.actions;
export default slice.reducer;

/**
 * Selectors
 */

// Selector
export const getUnresolvedBugsNormal = state => state.entities.bugs.filter(bug => !bug.resolved);

// Selector with memoization
export const getUnresolvedBugsMemoized = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
);
export const getUserBugs = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.id === userId)
);