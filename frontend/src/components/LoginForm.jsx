import { useState } from 'react'

export default function LoginForm ({ onSumbit }) {
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
    <article>
      <h2 className='text-center py-2 mt-7'>
        Inicia Sesión con tus credenciales
      </h2>
      <form onSubmit={handleLogin}>
        <label className='block'>
          correo:
          <input
            type='text'
            name='email'
            value={userCredentials.email}
            onChange={handleChange}
            data-testid='email'
            style={{ width: '360px' }}
          />
        </label>

        <label className='block'>
          contraseña:
          <input
            type='password'
            name='password'
            value={userCredentials.password}
            onChange={handleChange}
            data-testid='password'
            style={{ width: '360px' }}
          />
        </label>
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='text-white bg-primary'
            style={{ marginTop: '30px', width: '360px' }}
          >
            Login
          </button>
        </div>
      </form>
    </article>
  )
}
