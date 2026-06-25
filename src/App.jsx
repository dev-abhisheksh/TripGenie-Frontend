import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import MyTrips from './pages/MyTrips'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ItineraryDetails from './pages/ItineraryDetails'
import SharedItinerary from './pages/SharedItinerary'

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
    path: '/share/:shareId',
    element: <SharedItinerary />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'trips', element: <MyTrips /> },
      { path: 'trips/:id', element: <ItineraryDetails /> },
      { path: 'profile', element: <Profile /> },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}