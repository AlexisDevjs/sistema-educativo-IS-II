import { render, screen } from '@testing-library/react'
import Table from '../components/Table'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../redux/slices/userSlice'

function renderWithProviders (ui, { reduxState } = {}) {
  const store = configureStore({
    reducer: {
      users: usersReducer
    },
    preloadedState: reduxState
  })

  return render(<Provider store={store}>{ui}</Provider>)
}

test('renders user data in table', () => {
  const initialUsersState = {
    data: [
      {
        id: '1',
        date: '2024-07-01',
        ci: '1234567890',
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'teacher'
      }
    ],
    isLoading: false,
    error: null
  }

  renderWithProviders(<Table />, {
    reduxState: { users: initialUsersState }
  })

  expect(screen.getByText('2024-07-01')).toBeInTheDocument()
  expect(screen.getByText('1234567890')).toBeInTheDocument()
  expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
  expect(screen.getByText('johndoe@example.com')).toBeInTheDocument()
  expect(screen.getByText('teacher')).toBeInTheDocument()
})
