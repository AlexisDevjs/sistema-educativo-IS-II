import { Outlet, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { useEffect, useRef } from 'react'
import Modal from './Modal'
import RegisterForm from './RegisterForm'
import Menu from './Menu'

export default function Dashboard () {
  const registerFormRef = useRef()
  const { loggedUserState, handleLogout } = useLogin()
  const { loggedUser } = loggedUserState
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedUser) {
      navigate('/')
    }
  }, [loggedUser, navigate])

  if (!loggedUser) {
    return null
  }

  return (
    <div>
      <h1 className='bg-[#09f] shadow-xl text-center font-Lucida py-3 border-b-2 border-gray-200 text-2xl  text-white'>
        Gestión de Procesos Administrativos y Académicos
      </h1>

      <article className='container mx-auto'>
        <p className='py-3 mt-5 mb-4'>
          Has iniciado Sesión como {loggedUser.name}{' '}
          <button
            type='button'
            onClick={handleLogout}
            className='ml-4 underline hover:text-red-600'
          >
            Cerrar Sesión
          </button>
        </p>

        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <Modal
              ref={registerFormRef}
              buttonLabel='Agregar Usuario'
              buttonClassName='rounded-md border-primary text-[#09f] px-3 py-[8px] mt-5 block hover:bg-[#eaeaea] focus:outline-none cursor-pointer active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75'
            >
              <RegisterForm modalRef={registerFormRef} />
            </Modal>

            <Modal
              buttonLabel='Menú de opciones'
              buttonClassName='rounded-md current-border px-3 py-[8px] mt-5 block hover:bg-[#eaeaea] focus:outline-none cursor-pointer active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75'
            >
              <Menu />
            </Modal>
          </div>

          <h2 className='text-xl font-Lucida font-bold text-right py-4 mr-8'>
            Lista de Usuarios
          </h2>
        </div>

        <Outlet />
      </article>
    </div>
  )
}
