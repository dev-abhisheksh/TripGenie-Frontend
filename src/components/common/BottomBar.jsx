import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomBar = () => {
  const navItems = [
    { name: 'Explore', icon: 'explore', path: '/' },
    { name: 'My Trips', icon: 'map', path: '/trips' },
    { name: 'Saved', icon: 'bookmark', path: '/saved' },
    { name: 'AI Assistant', icon: 'auto_awesome', path: '/assistant' },
    { name: 'Profile', icon: 'person', path: '/profile' },
  ]

  const getLinkClass = (isActive) => {
    const base = 'flex flex-col items-center justify-center gap-1 py-1 px-3 transition-colors duration-300'
    return isActive 
      ? `${base} text-primary font-semibold` 
      : `${base} text-on-surface-variant hover:text-primary`
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-surface-container-low border-t border-outline-variant/30 flex justify-around items-center z-50 md:hidden shadow-lg px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => getLinkClass(isActive)}
        >
          {({ isActive }) => (
            <>
              <span 
                className="material-symbols-outlined text-xl" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomBar
