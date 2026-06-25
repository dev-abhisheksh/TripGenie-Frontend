import React, { useState } from 'react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import StatsSidebar from '../components/common/StatsSidebar'
import BottomBar from '../components/common/BottomBar'
import { useCurrentUser } from '../hooks/useCurrentUser'

const MainLayout = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(true)
  const location = useLocation()
  const isDashboard = location.pathname === '/'
  const { data: user, isLoading, error } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary text-5xl animate-spin">
            progress_activity
          </span>
          <p className="text-on-surface-variant text-sm font-semibold">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="flex pt-16 min-h-screen">
        <Sidebar />

        <main className={`flex-1 p-margin-mobile md:p-margin-desktop bg-surface min-h-[calc(100vh-64px)] transition-all duration-300 ease-in-out pb-24 md:pb-8 ml-0 md:ml-72 ${isStatsVisible ? 'mr-0 lg:mr-80' : 'mr-0'}`}>
          <Outlet />
        </main>

        <button 
          onClick={() => setIsStatsVisible(!isStatsVisible)}
          className={`fixed top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-outline-variant/30 shadow-md flex items-center justify-center hover:bg-surface-variant/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-[45] text-on-surface hidden lg:flex ${
            isStatsVisible ? 'right-[304px]' : 'right-4'
          }`}
        >
          <span className="material-symbols-outlined text-md block leading-none font-bold">
            {isStatsVisible ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <StatsSidebar isVisible={isStatsVisible} />
      </div>

      <BottomBar />

      {!isDashboard && (
        <Link 
          to="/" 
          state={{ triggerUpload: true }}
          className={`fixed z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden cursor-pointer border-none outline-none bottom-20 md:bottom-8 right-6 md:right-8 ${
            isStatsVisible ? 'lg:right-[22rem]' : 'lg:right-8'
          }`}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span 
            className="material-symbols-outlined text-2xl" 
            style={{ fontVariationSettings: "'wght' 600" }}
          >
            add
          </span>
        </Link>
      )}
    </div>
  )
}

export default MainLayout