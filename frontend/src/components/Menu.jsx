import { Link } from 'react-router-dom'

export default function Menu () {
  return (
    <article>
      <ul>
        <li>
          <Link to='/dashboard/usuarios'>
            Usuarios
          </Link>
        </li>
        <li>
          <Link to='/dashboard/cursos'>
            Cursos
          </Link>
        </li>
        <li>
          <Link to='/dashboard/courses'>
            Cursos
          </Link>
        </li>
      </ul>
    </article>
  )
}
