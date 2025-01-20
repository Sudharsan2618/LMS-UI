import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";
import questionsReducer from "../Store/questionsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionsReducer,

    },
});

export default store;
