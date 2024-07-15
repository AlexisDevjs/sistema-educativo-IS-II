import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export default function ProtectedRoute ({ children }) {
  const navigate = useNavigate()
  const loggedUser = useLogin().loggedUserState.loggedUser

  useEffect(() => {
    if (!loggedUser) {
      navigate('/')
    }
  }, [loggedUser, navigate])

  if (!loggedUser) {
    return null
  }

  return children
}
