import loginService from '../services/login'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useLogin () {
  const [loggedUser, setLoggedUser] = useState(null)

  const handleLogin = async (credentials) => {
    try {
      const returnedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      setLoggedUser(returnedUser)
    } catch (error) {
      toast.error('Error: Usuario o contraseña incorrectos')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setLoggedUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
  }, [])

  return { loggedUser, handleLogin, handleLogout }
}
