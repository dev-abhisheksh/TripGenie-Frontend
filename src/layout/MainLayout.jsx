import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import StatsSidebar from '../components/common/StatsSidebar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="flex pt-16 min-h-screen">
        <Sidebar />

        <main className="ml-72 mr-80 flex-1 p-margin-desktop bg-surface min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>

        <StatsSidebar />
      </div>

      <button className="fixed bottom-8 right-[22rem] z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden cursor-pointer border-none outline-none">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span 
          className="material-symbols-outlined text-2xl" 
          style={{ fontVariationSettings: "'wght' 600" }}
        >
          add
        </span>
      </button>
    </div>
  )
}

export default MainLayout