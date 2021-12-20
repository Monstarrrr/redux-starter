const toast = store => next => action => {
    if(action.type === 'Error') {
        console.log("Toastify: ", action.payload.message)
    }
    else {
        next(action);
    }
}

export default toast;