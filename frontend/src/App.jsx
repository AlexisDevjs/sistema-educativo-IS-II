import { useRef } from 'react'
import LoginForm from './components/LoginForm'
import Modal from './components/Modal'
import RegisterForm from './components/RegisterForm'
import Table from './components/Table'
import { useLogin } from './hooks/useLogin'
import { Toaster } from 'sonner'

export default function App () {
  const { loggedUser, handleLogin } = useLogin()
  const loginFormRef = useRef()
  const registerFormRef = useRef()

  return (
    <main className='main'>
      <Toaster richColors />
      <h1 className='text-center'>
        Gestión de Procesos Administrativos y Académicos
      </h1>
      <div className='containerButtons mt-7'>
        {!loggedUser && (
          <>
            <Modal buttonText='Iniciar Sesión' ref={loginFormRef}>
              <LoginForm onSumbit={handleLogin} />
            </Modal>

            <Modal
              buttonText='Registrarse'
              buttonClassName='bg-primary text-white'
              ref={registerFormRef}
            >
              <RegisterForm modalRef={registerFormRef} />
            </Modal>
          </>
        )}
      </div>

      <div>
        <p>Has iniciado Sesión como {loggedUser?.name}</p>
        <Table />
      </div>
    </main>
  )
}
