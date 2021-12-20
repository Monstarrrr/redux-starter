import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import toast from "./middleware/toast";
import api from './middleware/api';

// Without middleware
// export default function() {
//     return configureStore({ reducer });
// }

// With middleware
export default function() {
    return configureStore({
        reducer, 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            toast, api
        )
        // logger({ destination: "console" })
    })
}