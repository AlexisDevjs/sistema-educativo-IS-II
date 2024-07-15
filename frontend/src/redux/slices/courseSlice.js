import { createSlice } from '@reduxjs/toolkit'
import { resetErrorAndLoadingState } from '../utils'
import coursesService from '../../services/courses'

const initialState = {
  isLoading: false,
  error: null,
  data: []
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload
      resetErrorAndLoadingState(state)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

export const { setCourses, setLoading, setError } = courseSlice.actions

const coursesReducer = courseSlice.reducer
export default coursesReducer

export function intializeCourses () {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const courses = await coursesService.getAll()
      dispatch(setCourses(courses))
    } catch (error) {
      setError(error.message)
    }
  }
}
