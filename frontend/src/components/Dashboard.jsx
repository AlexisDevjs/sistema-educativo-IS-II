import { Outlet } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { Toaster } from 'sonner'

export default function Dashboard () {
  const { loggedUserState, handleLogout } = useLogin()
  const { loggedUser } = loggedUserState

  if (!loggedUser) {
    return null
  }

  return (
    <div>
      <Toaster richColors />

      <h1 className='bg-[#09f] default-shadow text-center font-Lucida py-3 border-b-1 border-gray-200 text-[21px]  text-white'>
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

        <Outlet />
      </article>
    </div>
  )
}
