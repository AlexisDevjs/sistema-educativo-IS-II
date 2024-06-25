import loginService from '../services/login'
import { useState } from 'react'
import { toast } from 'sonner'

export function useLogin () {
  const [loggedUser, setLoggedUser] = useState(null)

  const handleLogin = async (credentials) => {
    try {
      const returnedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      setLoggedUser(returnedUser)
      toast.success('Inicio de Sesión Exitoso')
    } catch (error) {
      console.error(error.message)
    }
  }

  return { loggedUser, handleLogin }
}
