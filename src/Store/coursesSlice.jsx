// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import api from "../api/api";
// import toast from 'react-hot-toast';

// // Fetch Courses API
// export const fetchCourses = createAsyncThunk(
//   "courses/fetchCourses",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("https://lms-be-do05.onrender.com/api/course-master");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "An error occurred");
//     }
//   }
// );

// // Fetch Course Details API
// export const fetchCourseDetails = createAsyncThunk(
//   "courses/fetchCourseDetails",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       const response = await api.post("https://lms-be-do05.onrender.com/api/course/enrollment_details", {
//         course_id: courseId,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "An error occurred");
//     }
//   }
// );

// // Fetch Course Content API
// export const fetchCourseContent = createAsyncThunk(
//   "courses/fetchCourseContent",
//   async ({ userId, courseId }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("https://lms-be-do05.onrender.com/api/course-content", {
//         user_id: userId,
//         course_id: courseId,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "An error occurred");
//     }
//   }
// );

// // Course Slice
// const coursesSlice = createSlice({
//   name: "courses",
//   initialState: {
//     courses: [],
//     courseDetails: null,
//     courseContent: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Courses
//       .addCase(fetchCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload.courses || [];
//       })
//       .addCase(fetchCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Course Details
//       .addCase(fetchCourseDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCourseDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courseDetails = action.payload;
//       })
//       .addCase(fetchCourseDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Course Content
//       .addCase(fetchCourseContent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCourseContent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courseContent = action.payload.data[0]?.get_course_data?.course_content;
//       })
//       .addCase(fetchCourseContent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default coursesSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from 'react-hot-toast';

// Fetch Courses API
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("https://lms-be-do05.onrender.com/api/course-master");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Fetch Course Details API
export const fetchCourseDetails = createAsyncThunk(
  "courses/fetchCourseDetails",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.post("https://lms-be-do05.onrender.com/api/course/enrollment_details", {
        course_id: courseId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Fetch Course Content API
export const fetchCourseContent = createAsyncThunk(
  "courses/fetchCourseContent",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      const response = await api.post("https://lms-be-do05.onrender.com/api/course-content", {
        user_id: userId,
        course_id: courseId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
// courseEnroll
export const courseEnroll = createAsyncThunk(
  "courses/courseEnroll",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      const response = await api.post("https://lms-be-do05.onrender.com/api/user_enroll", {
        user_id: userId,
        course_id: courseId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Update Course Progress API
export const updateCourseProgress = createAsyncThunk(
  "courses/updateCourseProgress",
  async ({ userId, courseId, subtitleId, masterId, progress, courseProgress }, { rejectWithValue }) => {
    try {
      const response = await api.post("https://lms-be-do05.onrender.com/api/course-progress", {
        user_id: userId,
        course_id: courseId,
        course_subtitle_id: subtitleId,
        course_mastertitle_breakdown_id: masterId,
        course_progress: courseProgress || 1,
        course_subtitle_progress: Math.round(progress) || 1,
      });
      return { subtitleId, progress: Math.round(progress) }; // Store in Redux
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Course Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    courseDetails: null,
    courseContent: null,
    progress: {}, // Track progress
    loading: false,
    error: null,
    courseProgress: null,
    isEnrolled: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses || [];
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Course Details
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.courseDetails = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Course Content
      .addCase(fetchCourseContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseContent.fulfilled, (state, action) => {
        state.loading = false;
        state.courseContent = action.payload.data[0]?.get_course_data?.course_content;
        state.courseProgress = action.payload.data[0]?.get_course_data?.user_progress;
      })
      .addCase(fetchCourseContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // courseEnroll
      .addCase(courseEnroll.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isEnrolled = false
      })
      .addCase(courseEnroll.fulfilled, (state, action) => {
        state.loading = false;
        state.isEnrolled = true
      })
      .addCase(courseEnroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isEnrolled = false
      })

      // Update Course Progress
      .addCase(updateCourseProgress.fulfilled, (state, action) => {
        state.progress[action.payload.subtitleId] = action.payload.progress;
      })
      .addCase(updateCourseProgress.rejected, (state, action) => {
        toast.error("Failed to update progress");
      });
  },
});

export default coursesSlice.reducer;
