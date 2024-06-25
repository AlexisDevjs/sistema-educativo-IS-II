import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/user'

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
    },
    createUser: (state, action) => {
      return state.data.push(action.payload)
    },
    editUser: (state, action) => {
      const { id, ...user } = action.payload
      const userIndex = state.data.findIndex((user) => user.id === id)
      state.data[userIndex] = user
    },
    deleteUser: (state, action) => {
      const id = action.payload
      state.data = state.data.filter((user) => user.id !== id)
    }
  }
})

const { setUsers, createUser } = userSlice.actions

const usersReducer = userSlice.reducer
export default usersReducer

export function initializeUsers () {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export function addUser (user) {
  return async (dispatch) => {
    const newUser = await userService.create(user)
    dispatch(createUser(newUser))
  }
}
