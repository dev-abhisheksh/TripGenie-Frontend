import React from 'react'

const Profile = () => {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <h1 className="font-display-lg text-display-lg text-on-surface">My Profile</h1>

      <div className="bg-white rounded-20px p-8 shadow-md border border-outline-variant/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container shrink-0">
          <img 
            className="w-full h-full object-cover" 
            alt="Alex Taylor" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDplyTyHNc_A_tGLpvN94vNUr3pul9RGo2cGJqmMenkRpRQvD4hVKgRtsH_CljNer-_6bYRGRrOlewNdVw463pjW7nXD6e6ykL3GWAPVkOgajPoabDzvpd_IAJVkFzYeolNILFpFDfMf_RRgKOv719eCfV6JEYFzfRERrKEhPncw5ggoxPM4qnfo_-5ojGk8fo7ocBxVKuNQnNtg0erz55JbfKbjj-eZivCk1OCofxuYxKAANoNA18i5d4j_9YTUERuJUTyh8KITQIh" 
          />
        </div>

        <div className="flex-1 text-center sm:text-left flex flex-col gap-4">
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <h2 className="font-headline-md text-2xl text-on-surface">Alex Taylor</h2>
              <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                Premium Member
              </span>
            </div>
            <p className="text-on-surface-variant font-medium text-sm mt-1">Global Explorer</p>
          </div>

          <div className="border-t border-b border-outline-variant/20 py-4 flex flex-col gap-2 text-sm text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>alex.taylor@voyage.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>San Francisco, CA</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-on-surface text-sm mb-1">Bio</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Passionate about discovering hidden local food spots, historical landmarks, and coastal walks across the globe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
