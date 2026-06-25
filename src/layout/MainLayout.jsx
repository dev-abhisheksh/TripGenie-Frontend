import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import StatsSidebar from '../components/common/StatsSidebar'

const MainLayout = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(true)

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="flex pt-16 min-h-screen">
        <Sidebar />

        <main className={`flex-1 p-margin-desktop bg-surface min-h-[calc(100vh-64px)] transition-all duration-300 ease-in-out ${isStatsVisible ? 'ml-72 mr-80' : 'ml-72 mr-0'}`}>
          <Outlet />
        </main>

        <button 
          onClick={() => setIsStatsVisible(!isStatsVisible)}
          className={`fixed top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-outline-variant/30 shadow-md flex items-center justify-center hover:bg-surface-variant/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-[45] text-on-surface ${
            isStatsVisible ? 'right-[304px]' : 'right-4'
          }`}
        >
          <span className="material-symbols-outlined text-md block leading-none font-bold">
            {isStatsVisible ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <StatsSidebar isVisible={isStatsVisible} />
      </div>

      <button className={`fixed bottom-8 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden cursor-pointer border-none outline-none ${isStatsVisible ? 'right-[22rem]' : 'right-8'}`}>
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