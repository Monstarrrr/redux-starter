import { combineReducers } from "redux";
import bugsReducer from './bugs';
import projectsReducer from './projects';
import peopleReducer from './people';

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    people: peopleReducer,
})