import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/user'
import { resetErrorAndLoadingState } from '../utils'
import { toast } from 'sonner'

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload
      resetErrorAndLoadingState(state)
    },
    createUser: (state, action) => {
      state.data.push(action.payload)
      resetErrorAndLoadingState(state)
    },
    editUser: (state, action) => {
      const { id, ...user } = action.payload
      const userIndex = state.data.findIndex((user) => user.id === id)
      state.data[userIndex] = { id, ...user }
      resetErrorAndLoadingState(state)
    },
    deleteUser: (state, action) => {
      const id = action.payload
      state.data = state.data.filter((user) => user.id !== id)
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

export const { setUsers, createUser, setError, setLoading } = userSlice.actions

const usersReducer = userSlice.reducer
export default usersReducer

export function initializeUsers () {
  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}

export function addUser (user) {
  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const newUser = await userService.create(user)
      toast.success('Usuario creado exitosamente')
      dispatch(createUser(newUser))
    } catch (error) {
      console.log(error)
      if (error.response.data.error === 'ci invalid') {
        dispatch(setError('Error: el número de céula es inválido'))
        toast.error('Error: el número de céula es inválido')
      } else {
        dispatch(setError('Error al registrar el usuario, verifique que los campos Nombre, Correo y Cédula sean únicos'))
        toast.error('Error al registrar el usuario, verifique que los campos Nombre, Correo y Cédula sean únicos')
      }
    }
  }
}
