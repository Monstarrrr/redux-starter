const toast = store => next => action => {
    if(action.type === 'Error') {
        console.log("This is a toast error: ", action.payload.message)
    }
    else {
        next(action);
    }
}

export default toast;