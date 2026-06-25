import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { logoutUser } from '../../api/auth.api'
import { useQueryClient } from '@tanstack/react-query'

  const Sidebar = () => {
  const {data:user, isLoading, error} = useCurrentUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error("Logout failed", err)
    } finally {
      queryClient.clear()
      navigate('/login', { replace: true })
    }
  }

    // console.log("current user",user)

    const navItems = [
      { name: 'Explore', icon: 'explore', path: '/' },
      { name: 'My Trips', icon: 'map', path: '/trips' },
      { name: 'Saved', icon: 'bookmark', path: '/saved' },
      { name: 'AI Assistant', icon: 'auto_awesome', path: '/assistant' },
    ]

    const getLinkClass = (isActive) => {
      const base = 'rounded-full mx-2 my-1 px-4 py-3 flex items-center gap-4 transition-all duration-300 ease-in-out'
      return isActive 
        ? `${base} bg-secondary-container text-on-secondary-container` 
        : `${base} text-on-surface-variant hover:bg-surface-variant/50`
    }

    return (
      <aside className="fixed left-0 top-16 bottom-0 z-[40] hidden md:flex flex-col h-[calc(100vh-64px)] w-72 bg-surface-container-low border-r border-outline-variant/30 px-2 py-4">
        <div className="flex flex-col gap-1 mb-8 px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt={user?.fullName || "Alex Taylor"} 
                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDplyTyHNc_A_tGLpvN94vNUr3pul9RGo2cGJqmMenkRpRQvD4hVKgRtsH_CljNer-_6bYRGRrOlewNdVw463pjW7nXD6e6ykL3GWAPVkOgajPoabDzvpd_IAJVkFzYeolNILFpFDfMf_RRgKOv719eCfV6JEYFzfRERrKEhPncw5ggoxPM4qnfo_-5ojGk8fo7ocBxVKuNQnNtg0erz55JbfKbjj-eZivCk1OCofxuYxKAANoNA18i5d4j_9YTUERuJUTyh8KITQIh"}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-headline-md text-base font-bold text-primary">
                {user?.fullName || 'Alex Taylor'}
              </span>
              <span className="text-xs text-on-surface-variant">{user?.username}</span>
            </div>
          </div>
          
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => getLinkClass(isActive)}
            >
              {({ isActive }) => (
                <>
                  <span 
                    className="material-symbols-outlined" 
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="mt-auto border-t border-outline-variant/20 pt-2 flex flex-col gap-1">
            <NavLink
              to="/profile"
              className={({ isActive }) => getLinkClass(isActive) + ' w-[calc(100%-16px)]'}
            >
              {({ isActive }) => (
                <>
                  <span 
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    person
                  </span>
                  <span className="font-medium">Profile</span>
                </>
              )}
            </NavLink>
            <button
              onClick={handleLogout}
              className="rounded-full mx-2 my-1 px-4 py-3 flex items-center gap-4 transition-all duration-300 ease-in-out text-on-surface-variant hover:bg-error/10 hover:text-error-container hover:text-error w-[calc(100%-16px)] text-left cursor-pointer border-none outline-none"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    )
  }

  export default Sidebar
