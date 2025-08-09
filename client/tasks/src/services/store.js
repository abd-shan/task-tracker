import {configureStore} from "@reduxjs/toolkit";
import taskSlice from "./TaskSlice.js";

const store = configureStore({
    reducer: {
        tasks:taskSlice
    }
})

export default store;
