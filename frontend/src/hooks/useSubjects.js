import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { intializeSubjects } from '../redux/slices/subjectSlice'

export function useSubjects () {
  const subjects = useSelector((state) => state.subjects.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeSubjects())
  }, [])

  return { subjects }
}
