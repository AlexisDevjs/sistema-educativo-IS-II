import { useRegisterForm } from '../hooks/useRegisterForm'

export default function RegisterForm ({ modalRef, onSubmit }) {
  const { formData, errors, handleChange, handleSubmit } = useRegisterForm()

  async function handleFormSubmit (event) {
    await handleSubmit(event, modalRef, onSubmit)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Registro</h1>

      <form
        onSubmit={handleFormSubmit}
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
            required
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </label>

        <label style={{ width: '300px' }}>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full'
            required
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </label>

        <label style={{ width: '300px' }}>
          Nro. de Cédula:
          <input
            type='text'
            name='ci'
            value={formData.ci}
            onChange={handleChange}
            className='w-full'
            required
          />
          {errors.ci && <span style={{ color: 'red' }}>{errors.ci}</span>}
        </label>

        <label style={{ width: '300px' }}>
          Contraseña:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full'
            required
          />
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password}</span>
          )}
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
