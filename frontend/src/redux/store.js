import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import subjectReducer from './slices/subjectSlice'
import coursesReducer from './slices/courseSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    subjects: subjectReducer,
    courses: coursesReducer
  }
})
