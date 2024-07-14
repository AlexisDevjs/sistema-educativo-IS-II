import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer
  }
})
