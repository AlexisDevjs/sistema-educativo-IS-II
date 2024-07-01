import { useState } from 'react'

export default function LoginForm ({ onSumbit, children }) {
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

  const handleLogin = (event) => {
    event.preventDefault()
    onSumbit(userCredentials)
  }

  return (
    <article className='loginFormContainer mt-7'>
      <h2 className='text-center'>Inicia Sesión</h2>
      <form onSubmit={handleLogin}>
        <label className='block'>
          Correo:
          <input
            type='text'
            name='email'
            required
            value={userCredentials.email}
            onChange={handleChange}
            data-testid='email'
            style={{ width: '330px' }}
          />
        </label>

        <label className='block' style={{ marginTop: '20px' }}>
          Contraseña:
          <input
            type='password'
            name='password'
            required
            value={userCredentials.password}
            onChange={handleChange}
            data-testid='password'
            style={{ width: '330px' }}
          />
        </label>
        <div className='flex flex-col items-center justify-center'>
          <button
            type='submit'
            className='text-white bg-primary'
            style={{ marginTop: '30px', width: '350px' }}
          >
            Iniciar Sesión
          </button>
          {children}
        </div>
      </form>
    </article>
  )
}
