/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import Modal from './Modal'
import './table.css'
import { useUsers } from '../hooks/useUsers'
import RegisterForm from './RegisterForm'

export default function Table () {
  const { usersState, updateUsers } = useUsers()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const modalRef = useRef()

  const handleSubmit = (newUser) => {
    updateUsers(newUser)
  }

  // Calcula el índice de los elementos a mostrar en la página actual
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = usersState.data.slice(indexOfFirstRow, indexOfLastRow)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // Cambia la cantidad de filas por página
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(1)
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Registro de estudiantes y docentes</h1>
      <div className='flex justify-between mt-20 mb-35'>
        <Modal buttonText='Nuevo' ref={modalRef}>
          <RegisterForm modalRef={modalRef} onSubmit={handleSubmit} />
        </Modal>
        <button className='btn btn-danger'>Eliminar Usuario</button>
      </div>
      <table className='table text-center'>
        <thead>
          <tr>
            <th className='th'>Fecha de Creación</th>
            <th className='th'>CI Usuario</th>
            <th className='th'>Nombre</th>
            <th className='th'>Correo</th>
            <th className='th'>Rol</th>
            <th className='th'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user, index) => (
            <tr key={index}>
              <td>{user.date}</td>
              <td>{user.ci}</td>
              <td>{user.name.toUpperCase()}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button type='button'>Editar</button>
                <button type='button'>Información</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div className='pagination flex justify-between'>
        {/* Selector de número de filas por página */}
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[3, 10, 15].map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </select>

        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(usersState.data.length / rowsPerPage)
            }
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
