import { forwardRef, useImperativeHandle, useState } from 'react'
import { Dialog, DialogPanel } from '@tremor/react'

const Modal = forwardRef(({ buttonLabel, buttonClassName, closeButtonLabel, width, children }, refs) => {
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
    <article>
      <button
        type='button'
        className={`text-base ${buttonClassName}`}
        onClick={toggleModal}
      >
        {buttonLabel}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static
        className='z-[100]'
      >
        <DialogPanel className={width ? 'max-w-[900px]' : 'max-w-sm '}>
          {children}
          <button
            className='close-register-modal-button text-gray-700 mt-2'
            onClick={() => setIsOpen(false)}
          >
            {closeButtonLabel || 'Cancelar'}
          </button>
        </DialogPanel>
      </Dialog>
    </article>
  )
})

export default Modal
