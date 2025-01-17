import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
