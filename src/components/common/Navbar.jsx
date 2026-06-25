import React from 'react'
import { useCurrentUser } from '../../hooks/useCurrentUser'

const Navbar = () => {

  const {data:user, isLoading, error} = useCurrentUser()

  console.log(user)

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">TripGenie</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-primary-container/20 transition-colors duration-300 rounded-full cursor-pointer">
            <span className="material-symbols-outlined block">notifications</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-primary-container/20 transition-colors duration-300 rounded-full cursor-pointer">
            <span className="material-symbols-outlined block">search</span>
          </button>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img
            className="w-full h-full object-cover"
            alt="User profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfWLIzLztXP7A-UNhveckXnMIDbfwEH3E_0I35BPE8kZWYgRqyf0A6jJmN6m4JrOXv1yaGFIOG0rjkYhayIIjMN21IY4ZBwS82ACBJzAL7SW1naI1eInPGIMq5S2VckGpheFmvYrUHYAjDOsHF7U5f5lqm3QrIc53zFk1JeZyZmuNTkkS6wXB2Msw2Efk3A3oPMaAN6u4bDu1TNPZw5xH-S7Cew00NSI1dOYLXkJLmyoPbpl9R-CUXba01rYSAP85255fmziP86M4d"
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar