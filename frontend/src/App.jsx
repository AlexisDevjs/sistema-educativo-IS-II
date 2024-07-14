import { useLogin } from './hooks/useLogin'
import { Toaster } from 'sonner'
import LoginForm from './components/LoginForm'

export default function App () {
  const { loggedUser } = useLogin().loggedUserState

  if (loggedUser) {
    return null
  }

  return (
    <>
      <Toaster richColors />
      <main className='flex justify-center items-center h-[90vh]'>
        <LoginForm />
      </main>
    </>
  )
}
