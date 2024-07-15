import { useRef } from 'react'
import Modal from './Modal'
import RegisterForm from './RegisterForm'
import Menu from './Menu'

export default function TableWrapper ({ nameOfData, children }) {
  const registerFormRef = useRef()

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <Modal
            ref={registerFormRef}
            buttonLabel='Agregar Usuario'
            buttonClassName='rounded-md border-primary text-[#09f] px-3 py-2 mt-5 block hover:bg-[#eaeaea] focus:outline-none cursor-pointer active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75'
          >
            <RegisterForm modalRef={registerFormRef} />
          </Modal>

          <Modal
            buttonLabel='Menú de opciones'
            closeButtonLabel='Cerrar'
            buttonClassName='rounded-md current-border px-3 py-[8px] mt-5 block hover:bg-[#eaeaea] focus:outline-none cursor-pointer active:translate-y-[2px] active:translate-x-[1px] transition-transform duration-75'
          >
            <Menu />
          </Modal>

        </div>

        <h2 className='text-xl font-Lucida font-bold text-right py-4 mr-8 flex items-center'>
          {nameOfData}
        </h2>
      </div>

      {children}
    </div>
  )
}
