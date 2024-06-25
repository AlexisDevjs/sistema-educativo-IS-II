import { useState } from 'react'
import userServices from '../services/user'

const initialState = {
  name: '',
  email: '',
  password: '',
  ci: '',
  role: 'teacher'
}

export default function RegisterForm ({ modalRef, onSubmit }) {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newUser = {
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'student' : 'teacher') : value
    }

    setFormData(newUser)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    modalRef.current.toggleModal()

    try {
      const savedUser = await userServices.register(formData)
      onSubmit(savedUser)
    } catch (error) {
      console.error('Error registering user:', error.response.data)
    }

    setFormData(initialState)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Registro</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <label style={{ width: '300px' }}>
          Nombres Completos:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full'
          />
        </label>

        <label style={{ width: '300px' }}>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full'
          />
        </label>

        <label style={{ width: '300px' }}>
          Nro. de Cédula:
          <input
            type='text'
            name='ci'
            value={formData.ci}
            onChange={handleChange}
            className='w-full'
          />
        </label>

        <label style={{ width: '300px' }}>
          Contraseña:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full'
          />
        </label>

        <label
          style={{ width: '300px', display: 'flex', alignItems: 'center' }}
        >
          Estudiante:
          <input
            type='checkbox'
            name='role'
            checked={formData.role === 'student'}
            onChange={handleChange}
            style={{ marginLeft: '10px' }}
            className='w-full'
          />
        </label>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '100px',
            marginTop: '20px'
          }}
        >
          <button
            type='button'
            onClick={() => {
              modalRef.current.toggleModal()
            }}
          >
            Cancelar
          </button>
          <button type='submit'>Registrarse</button>
        </div>
      </form>
    </div>
  )
}
