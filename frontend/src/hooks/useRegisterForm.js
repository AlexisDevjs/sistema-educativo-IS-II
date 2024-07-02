import { useState } from 'react'
import { toast } from 'sonner'
import { addUser } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const initialState = {
  name: '',
  email: '',
  password: '',
  ci: '',
  role: 'teacher'
}

export function useRegisterForm () {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validateName = (name) => {
    const sanitized = name.replace(/[0-9]/g, '')

    if (sanitized !== name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'No se permiten números en el nombre'
      }))
    } else {
      setErrors((prevErrors) => {
        const { name, ...rest } = prevErrors
        return rest
      })
    }

    return sanitized
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'El correo electrónico no es válido'
      }))
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors
        return rest
      })
    }
  }

  const validateCI = (ci) => {
    const sanitized = ci.replace(/[^0-9]/g, '').slice(0, 10)

    if (sanitized.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ci: 'El número de cédula debe contener 10 dígitos y no puede contener letras'
      }))
    } else {
      setErrors((prevErrors) => {
        const { ci, ...rest } = prevErrors
        return rest
      })
    }

    return sanitized
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/

    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'La contraseña debe tener al menos una mayúscula y un número'
      }))
    } else {
      setErrors((prevErrors) => {
        const { password, ...rest } = prevErrors
        return rest
      })
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    let newValue = value

    if (name === 'name') {
      newValue = validateName(value)
    } else if (name === 'email') {
      validateEmail(value)
    } else if (name === 'ci') {
      newValue = validateCI(value)
    } else if (name === 'password') {
      validatePassword(value)
    } else if (type === 'checkbox') {
      newValue = checked ? 'student' : 'teacher'
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }))
  }

  const handleSubmit = async (event, modalRef, onSubmit) => {
    event.preventDefault()

    try {
      const savedUser = dispatch(addUser(formData))
      onSubmit(savedUser)
      modalRef.current.toggleModal()
      toast.success('Usuario registrado con éxito')
    } catch (error) {
      toast.error(
        'Error al registrar el usuario el nombre de usuario, correo y npumero de cédula deben ser unicos'
      )
    }

    setFormData(initialState)
  }

  return { formData, errors, handleChange, handleSubmit }
}
