import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { intializeCourses } from '../redux/slices/courseSlice'

export function useCourses () {
  const courses = useSelector((state) => state.courses.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeCourses())
  }, [])

  return { courses }
}
