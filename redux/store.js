import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

//All the user data are stored in backend, rather than getting them stored in the variables
//of the component, we will save them in this store, so that we can access them using useSelector
export const store = configureStore({
    //below is a combined reducer
    reducer: {
        user: userReducer,
        other: otherReducer,
        product: productReducer,
        cart: cartReducer,
    },
});

export const server = "https://marketo-ecommerce-server.onrender.com/api/v1"
// export const server = "http://localhost:5000/api/v1"


