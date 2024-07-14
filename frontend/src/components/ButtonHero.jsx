import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Dialog, DialogPanel } from '@tremor/react'

const Modal = forwardRef(({ buttonText, buttonClassName, children }, refs) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleModal
    }
  })

  return (
    <div>
      <Button type='button' variant='secondary' className={buttonClassName} onClick={toggleModal}>
        {buttonText}
      </Button>
      {isOpen && (
        <div className={`modal-overlay ${isOpen ? 'modal-show' : ''}`}>
          <div className='modal'>
            <button className='modal-close' onClick={toggleModal}>
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  )
})

export default Modal
