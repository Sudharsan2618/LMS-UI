import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from 'react-hot-toast';

// Fetch Questions API
export const fetchQuestions = createAsyncThunk(
    "questions/fetchQuestions",
    async ({ tabId, userId }, { rejectWithValue }) => {
        try {
            const response = await api.post(`https://lms-be-do05.onrender.com/api/initial_assessment_questions`, {
                tab_id: tabId,
                user_id: userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        questions: [],
        tabName: "",
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Questions
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload.questions || [];
                state.tabName = action.payload.tab_name || "";
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default questionsSlice.reducer;
