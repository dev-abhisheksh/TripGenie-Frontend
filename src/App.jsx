import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import MyTrips from './pages/MyTrips'
import Saved from './pages/Saved'
import AIAssistant from './pages/AIAssistant'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'trips', element: <MyTrips /> },
      { path: 'saved', element: <Saved /> },
      { path: 'assistant', element: <AIAssistant /> },
      { path: 'profile', element: <Profile /> },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}