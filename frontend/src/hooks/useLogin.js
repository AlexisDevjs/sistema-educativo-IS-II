import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginWithCredentials, logoutUser } from '../redux/slices/authSlice'
import { useEffect } from 'react'

export function useLogin () {
  const loggedUserState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedUserState.loggedUser) {
      navigate('/dashboard/users')
    }
  }, [loggedUserState.loggedUser, navigate])

  const handleLogin = (credentials) => {
    dispatch(loginWithCredentials(credentials))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return { loggedUserState, handleLogin, handleLogout }
}
