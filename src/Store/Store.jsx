import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";
import questionsReducer from "../Store/questionsSlice";
import coursesReducer from "../Store/coursesSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionsReducer,
        courses: coursesReducer,

    },
});

export default store;
