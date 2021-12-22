import { combineReducers } from "redux";
import bugsReducer from '../reducers/bugs';
import projectsReducer from '../reducers/projects';
import peopleReducer from '../reducers/people';
import productsReducer from '../reducers/products';

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    people: peopleReducer,
    products: productsReducer,
})