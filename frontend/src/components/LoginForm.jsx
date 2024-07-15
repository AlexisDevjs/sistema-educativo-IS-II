import { useRef, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { toast, Toaster } from 'sonner'
import Modal from './Modal'
import RegisterForm from './RegisterForm'

export default function LoginForm ({ children }) {
  const registerFormRef = useRef()
  const { loggedUserState, handleLogin } = useLogin()
  const { isLoading, error } = loggedUserState

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = ({ target }) => {
    setUserCredentials({
      ...userCredentials,
      [target.name]: target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(userCredentials)
  }

  if (error) {
    toast.error(error)
  }

  return (
    <>
      <Toaster richColors />
      <article className='flex flex-col w-[380px] login-form-box px-6 py-11 mx-auto'>
        <h2 className='font-Lucida text-center text-2xl font-bold'>
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='flex flex-col mt-8'>
            Correo:
            <input
              type='email'
              name='email'
              required
              value={userCredentials.email}
              onChange={handleChange}
              data-testid='email'
              className='py-[10px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
            />
          </label>

          <label className='flex flex-col mt-4'>
            Contraseña:
            <input
              type='password'
              name='password'
              required
              value={userCredentials.password}
              onChange={handleChange}
              data-testid='password'
              className='py-[10px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
            />
          </label>
          <div className='flex flex-col items-center justify-center'>
            <button
              type='submit'
              className='text-white bg-[#09f] rounded-md py-[10px] mt-5 block w-full hover:bg-[#038be6] focus:outline-none cursor-pointer active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75'
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
            {children}
          </div>
        </form>
        <Modal
          ref={registerFormRef}
          buttonLabel='Registrarse'
          buttonClassName='rounded-md py-[10px] mt-2 block w-full current-border hover:bg-[#f2f2f2] transition-colors active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75 text-base text-[#09f] border-primary cursor-pointer'
        >
          <RegisterForm modalRef={registerFormRef} />
        </Modal>
      </article>
    </>
  )
}
