import { forwardRef, useImperativeHandle, useState } from 'react'

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
      <button type='button' className={buttonClassName} onClick={toggleModal}>
        {buttonText}
      </button>
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
