import { compose, pipe } from 'lodash/fp';
import { produce } from 'immer';
// Redux
import configureStore from './store/configureStore';
import { 
    addBug,
    assignBugToUser,
    resolveBug,
    getUnresolvedBugsNormal,
    getUnresolvedBugsMemoized
} from './store/bugs';
import { projectAdded, projectRemoved } from './store/projects';
import { 
    addPerson, 
    addCity, 
    addPet, 
    removeCityPeople,
    setPetAge
} from './store/people';
import api from './store/middleware/api';
import * as actions from './store/api';


/**
 * Redux
 */

// Initialize store
const store = configureStore(); 

// Bugs
store.dispatch(addBug({ description: "Bug 1" }));
store.dispatch(addBug({ description: "Bug 2" }));
store.dispatch(addBug({ description: "Bug 3" }));
store.dispatch(resolveBug({ id: 1 }));
store.dispatch(assignBugToUser({ bugId: 1, userId: 1 }))
const unresolvedBugsNormal = getUnresolvedBugsNormal(store.getState());
const unresolvedBugsMemoized = getUnresolvedBugsMemoized(store.getState());
console.log("Unresolved bugs selector .:");
console.log(unresolvedBugsNormal);

// Projects
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectRemoved({ id: 1 }))

// People
store.dispatch(addPerson({ 
    id: 0, 
    name: "Monstar", 
    lived: ["NYC, Paris"], 
    pets: { 
        Mystie: {
            type: "Dog",
            age: 4,
        }
    } 
}))
store.dispatch(addPerson({ 
    id: 1, 
    name: "Yoann", 
    lived: ["London", "Paris"], 
    pets: { 
        Luna: {
            type: "Cat",
            age: 5,
        }
    } 
}))
store.dispatch(addCity({ id: 1, livedAdd: "Lyon" }))
store.dispatch(setPetAge({ id: 0, petName: "Mystie", petAge: 5 }))
store.dispatch(removeCityPeople({ cityName: "Lyon" }))
store.dispatch(addPet({ id: 0, name: "Bouboul", type: "Hamster", age: 3 }))

// Middleware toast
store.dispatch({
    type: "Error",
    payload: {
        message: "An error has occurred"
    }
})
// Middleware API
store.dispatch(actions.apiCallBegan({
    url: '/products',
    method: 'get',
}))

// Unsubscribe
const unsubscribe = store.subscribe(() => {
    console.log("Red-- Store changed!")
});
unsubscribe();


/**
 * Currying (with lodash)
 */

let input = "    mONSTar     "
let type = "div";

// TRIM
const trim = str => str.trim();
console.log(trim(input))

// LOWERCASE
const toLowerCase = str => str.toLowerCase();
console.log(toLowerCase(input))

// WRAP IN DIV
const wrap = type => str => 
    `<${type}>${str}</${type}>`;
console.log(wrap(type)(input))

const result = pipe(trim, toLowerCase, wrap(type));
console.log(result(input))

/**
 * The importance of deep copying with Spread operator
 */

const person1 = {
    name: "Jhon",
    address: {
        country: "USA",
        city: "SF"
    }
}

const updatedPerson1 = {
    ...person1,
}

updatedPerson1.address.city = "New York"

console.log("Person 1: " + JSON.stringify(person1));
// Bad:
// person1.address returns "New York" too. Person1 is mutable.

// Solution:

const person2 = {
    name: "Jhon",
    address: {
        country: "USA",
        city: "SF"
    }
}

const updatedPerson2 = {
    ...person2,
    address: {
        ...person2.address, // deep copy
    }
}

updatedPerson2.address.city = "New York"

console.log("Person 2: " + JSON.stringify(person2)) 
// Good: 
// person2.address returns "SF". Person2 is immutable.


/**
 * Immutability with arrays
 */

const numbers = [1, 2, 3];

// Adding (at end or beginning)
const addedEnd = [...numbers, 4]; // [1, 2, 3, 4]
const addedStart = [4, ...numbers]; // [4, 1, 2, 3]

// Adding (somewhere specific)
const index = numbers.indexOf(2); // Get the index of 2
const addedSpecific = [
    ...numbers.slice(0, index), // Returns new array from [0] to [index] excluded
    //^ Spread to not create a new array within the existing array
    4,
    ...numbers.slice(index), // Returns rest of the array from [index] included
]
console.log(addedSpecific); // [ 1, 4, 2, 3 ]

// Removing (everything except value 2)
const removeValue = numbers.filter(n => n !== 2)
console.log(removeValue) // [ 1, 3 ]

// Updating (2 becomes 20)
const updateValue = numbers.map(n => n === 2 ? 20 : n)
console.log(updateValue) // [ 1, 20, 3 ]

/**
 * Immer.js
 */

let book1 = {
    title: "Tolstoi",
}

function updateBook(book) {
    return produce(book, draftBook2 => { // draftBook is a proxy of book
        draftBook2.isPublished = true; // We write our mutating code here
    })
}

let updatedBook1 = updateBook(book1);

console.log("Book1 : " + JSON.stringify(book1)); // {"title":"Tolstoi"}
console.log("updatedBook1: " + JSON.stringify(updatedBook1)); // {"title":"Tolstoi","isPublished":true}