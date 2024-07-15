import { createSlice } from '@reduxjs/toolkit'
import { resetErrorAndLoadingState } from '../utils'
import subjectsService from '../../services/subjects'

const initialState = {
  isLoading: false,
  error: null,
  data: []
}

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubjects: (state, action) => {
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

export const { setSubjects, setLoading, setError } = subjectSlice.actions

const subjectReducer = subjectSlice.reducer
export default subjectReducer

export function intializeSubjects () {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const subjects = await subjectsService.getAll()
      dispatch(setSubjects(subjects))
    } catch (error) {
      setError(error.message)
    }
  }
}
