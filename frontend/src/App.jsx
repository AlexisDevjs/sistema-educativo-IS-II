import { useRef } from 'react'
import LoginForm from './components/LoginForm'
import Modal from './components/Modal'
import RegisterForm from './components/RegisterForm'
import Table from './components/Table'
import { useLogin } from './hooks/useLogin'
import { Toaster } from 'sonner'

export default function App () {
  const { loggedUser, handleLogin, handleLogout } = useLogin()
  const registerFormRef = useRef()

  return (
    <main className='main'>
      <Toaster richColors />
      <h1 className='text-center'>
        Gestión de Procesos Administrativos y Académicos
      </h1>
      <div className='containerButtons mt-7'>
        {!loggedUser && (
          <div style={{ marginTop: '80px' }}>
            <LoginForm onSumbit={handleLogin}>
              <Modal
                buttonText='Registrarse'
                buttonClassName='registerButton'
                ref={registerFormRef}
              >
                <RegisterForm modalRef={registerFormRef} />
              </Modal>
            </LoginForm>
          </div>
        )}
      </div>

      <div>
        {loggedUser && (
          <p>
            Has iniciado Sesión como {loggedUser?.name}{' '}
            <button type='button' onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </p>
        )}
        {loggedUser && <Table />}
      </div>
    </main>
  )
}
