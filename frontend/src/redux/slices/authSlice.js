import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import { resetErrorAndLoadingState } from '../utils'

const initialState = {
  isLoading: false,
  loggedUser: JSON.parse(window.localStorage.getItem('loggedUser')) || null,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedUser = action.payload
      resetErrorAndLoadingState(state)
    },
    logout: (state) => {
      state.loggedUser = null
      resetErrorAndLoadingState(state)
    },
    setLoading: (state) => {
      state.isLoading = true
      state.error = null
    },
    setError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { login, logout, setLoading, setError } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer

export function loginWithCredentials (credentials) {
  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const returnedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      dispatch(login(returnedUser))
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setError('Credenciales incorrectas, inténtalo de nuevo'))
      } else {
        dispatch(
          setError('Ha ocurrido un error inesperado, inténtalo de nuevo')
        )
      }

      setTimeout(() => {
        dispatch(setError(null))
      }, 500)
    }
  }
}

export function logoutUser () {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }
}
