import { Link } from 'react-router-dom'

export default function Menu () {
  return (
    <article>
      <h2 className='font-Lucida text-xl font-semibold text-tremor-content-strong text-center py-2'>
        Menú de opciones disponibles
      </h2>

      <ul className='flex flex-col gap-3 py-4 px-2 my-3'>
        <li className='py-[7px] bg-gray-100 hover:bg-gray-300 border-light text-center rounded-md transition-colors duration-200 text-gray-700'>
          <Link to='/dashboard/usuarios'>Lista de Usuarios</Link>
        </li>
        <li className='py-[7px] bg-[#09f] hover:bg-[#0988dd] text-white text-center rounded-md transition-colors duration-200'>
          <Link to='/dashboard/oferta-academica'>
            Consultar información académica
          </Link>
        </li>
        <li className='py-[7px] bg-gray-100 hover:bg-gray-300 border-light text-center rounded-md transition-colors duration-200 text-gray-700'>
          <Link to='/dashboard/courses'>Generar reportes</Link>
        </li>
        <li className='py-[7px] bg-[#09f] hover:bg-[#0988dd] text-white text-center rounded-md transition-colors duration-200'>
          <Link to='/dashboard/courses'>Acreditar reportes académicos</Link>
        </li>
      </ul>
    </article>
  )
}
