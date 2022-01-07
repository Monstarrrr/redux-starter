import moment from 'moment';

const expiryTime = 10;

const diffInMinutes = (lastFetch) => {
    moment().diff(moment(lastFetch), 'minutes');
}
export const cacheExpired = (lastFetch) => {
    if(
        diffInMinutes(lastFetch) > expiryTime 
        || 
        lastFetch === null
    ) return true;
    else return false;
}