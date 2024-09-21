import { configureStore } from "@reduxjs/toolkit";
import credentialSlice from "./credentials";
import postSlice from "./postStore";



const Store=configureStore({
    reducer:{
        credential:credentialSlice.reducer,
        postStore:postSlice.reducer
    }
})


export default Store;