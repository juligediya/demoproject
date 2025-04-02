import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./persist";


const store=configureStore({
    reducer:persistedReducer,
   
})

export default store;