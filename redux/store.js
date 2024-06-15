import { configureStore } from "@reduxjs/toolkit";
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

// export const server = "https://marketo-ecommerce-server.onrender.com/api/v1";
// export const server = "https://cato-server-production.up.railway.app/api/v1"
//this one is from cyclic
// export const server = "http://192.168.29.234:8000/api/v1";
// export const server = "http://localhost:5000/api/v1"
export const server =
  "http://cato-new-server-env.eba-kmee4b2h.ap-south-1.elasticbeanstalk.com/api/v1";
