import { useRegisterForm } from '../hooks/useRegisterForm'

export default function RegisterForm ({ modalRef }) {
  const { formData, errors, handleChange, handleSubmit } = useRegisterForm()

  const handleFormSubmit = (event) => {
    handleSubmit(event, modalRef)
  }

  return (
    <div>
      <h2 className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-center text-2xl font-Lucida'>
        Registro
      </h2>

      <form onSubmit={handleFormSubmit} className='flex flex-col'>
        <label className='flex flex-col mt-6 text-gray-700'>
          Nombres Completos:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='py-[6px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
            required
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </label>

        <label className='flex flex-col mt-4 text-gray-700'>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='py-[6px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
            required
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </label>

        <label className='flex flex-col mt-4 text-gray-700'>
          Nro. de Cédula:
          <input
            type='text'
            name='ci'
            value={formData.ci}
            onChange={handleChange}
            className='py-[6px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
            required
          />
          {errors.ci && <span style={{ color: 'red' }}>{errors.ci}</span>}
        </label>

        <label className='flex flex-col mt-4 text-gray-700'>
          Contraseña:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='py-[6px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
            required
          />
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password}</span>
          )}
        </label>

        <label className='flex gap-2 text-center mt-4 text-gray-700'>
          Estudiante:
          <input
            type='checkbox'
            name='role'
            checked={formData.role === 'estudiante'}
            onChange={handleChange}
            className='py-[10px] bg-[#E8F0FE] rounded-md mt-[2px] px-3 text-[15px] focus:outline-[#09f] border-light'
          />
        </label>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '100px',
            marginTop: '1px'
          }}
        >
          <button
            type='submit'
            className='text-white bg-[#09f] rounded-md py-2 mt-5 block w-full hover:bg-[#038be6] focus:outline-none cursor-pointer active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75'
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  )
}
