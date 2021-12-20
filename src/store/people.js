import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: "people",
    initialState: [],
    reducers: {
        addPerson: (people, action) => {
            const { id, name, lived, pets } = action.payload;
            people.push({
                id, name, lived, pets
            })
        },
        addCity: (people, action) => {
            // [ {...}, {...}, ... ]
            const { id, livedAdd } = action.payload;
            const personIndex = people.findIndex(el => el.id === id)
            people[personIndex].lived.push(livedAdd)
        },
        removeCity: (people, action) => {
            const { id, cityName } = action.payload;
            const personIndex = people.findIndex(el => el.id === id)
            return people[personIndex].lived.filter(el => el !== cityName)
        },
        setPetAge: (people, action) => {
            const { id, petName, petAge } = action.payload;
            const personIndex = people.findIndex(el => el.id === id)
            people[personIndex].pets[petName].age = petAge;
        },
        // Remove anyone that has lived in that city
        removeCityPeople: (people, action) => {
            const { cityName } = action.payload;
            return people.filter(person => !person.lived.includes(cityName))
        },
        addPet: (people, action) => {
            const { id, name, type, age, breed } = action.payload;
            const personIndex = people.findIndex(el => el.id === id)
            people[personIndex].pets = {
                ...people[personIndex].pets,
                [name]: {
                    type, age, breed
                }
            }
        },
        // Removing any person with petName
        removeWithPet: (people, action) => {
            const { petName } = action.payload;
            return people.filter(person => !Object.keys(person.pets).includes(petName))
        },
    }
})

export const { 
    addPerson, 
    addCity, 
    addPet, 
    addTwoPeople, 
    removeCity, 
    removeCityPeople,
    removeWithPet,
    setPetAge,
} = slice.actions;
export default slice.reducer;