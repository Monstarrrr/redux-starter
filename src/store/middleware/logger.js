const logger = param => store => next => action => {
    console.log(param)
    console.log(store)
    console.log(next)
    console.log(action)
    next(action);
}

export default logger;