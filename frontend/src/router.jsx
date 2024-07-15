import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Dashboard from './components/Dashboard'
import ListOfUsers from './components/ListOfUsers'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorPage from './error-page'
import ListOfSubjects from './components/ListOfSubjects'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'usuarios',
        element: (
          <ListOfUsers />
        )
      },
      {
        path: 'oferta-academica',
        element: (
          <ListOfSubjects />
        )
      }
    ]
  }
])
