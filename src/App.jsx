import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/layout/Main'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import { TodoProvider } from './components/TodoContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])

function App() {
  return (
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  )
}

export default App