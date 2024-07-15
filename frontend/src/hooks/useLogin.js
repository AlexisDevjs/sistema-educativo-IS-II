import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { loginWithCredentials, logoutUser } from '../redux/slices/authSlice'
import { useEffect } from 'react'

export function useLogin () {
  const loggedUserState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedUserState.loggedUser && window.location.pathname === '/') {
      navigate('/dashboard/usuarios')
    }
  }, [loggedUserState.loggedUser, navigate])

  const handleLogin = (credentials) => {
    dispatch(loginWithCredentials(credentials))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    redirect('/')
  }

  return { loggedUserState, handleLogin, handleLogout }
}
