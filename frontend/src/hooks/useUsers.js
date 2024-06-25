import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, initializeUsers } from '../redux/slices/userSlice'

export function useUsers () {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.data)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const updateUsers = (updatedUsers) => {
    dispatch(addUser(updatedUsers))
  }

  return { users, updateUsers }
}
