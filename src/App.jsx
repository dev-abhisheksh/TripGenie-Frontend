import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import MyTrips from './pages/MyTrips'
import Saved from './pages/Saved'
import AIAssistant from './pages/AIAssistant'
import Settings from './pages/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'trips', element: <MyTrips /> },
      { path: 'saved', element: <Saved /> },
      { path: 'assistant', element: <AIAssistant /> },
      { path: 'settings', element: <Settings /> },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}