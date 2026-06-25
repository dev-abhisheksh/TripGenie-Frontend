import React from 'react'

const StatsSidebar = () => {
  const stats = [
    {
      label: 'Total Trips',
      value: '24',
      icon: 'flight_takeoff',
      iconColor: 'text-primary',
    },
    {
      label: 'Countries Visited',
      value: '18',
      icon: 'public',
      iconColor: 'text-secondary',
    },
    {
      label: 'Last Upload',
      value: 'Yesterday, 4:20 PM',
      icon: 'history',
      iconColor: 'text-on-surface-variant',
      isTextVal: true,
    },
  ]

  const quickTips = [
    'Traveling to Japan? Most ATMs in 7-Eleven stores accept international cards 24/7.',
    'Scan your passport and store it in your Saved tab for quick offline access.',
    'Check the \'Vibe\' chips on itineraries to find hidden local spots that match your style.',
  ]

  return (
    <aside className="fixed right-0 top-16 bottom-0 w-80 bg-white border-l border-outline-variant/30 p-6 z-[30] overflow-y-auto hide-scrollbar">
      <h2 className="font-headline-md text-lg mb-6">Your Stats</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`material-symbols-outlined ${stat.iconColor}`}>{stat.icon}</span>
              <span className="text-sm font-medium text-on-surface-variant">{stat.label}</span>
            </div>
            {stat.isTextVal ? (
              <span className="text-lg font-semibold text-on-surface">{stat.value}</span>
            ) : (
              <span className="text-3xl font-bold text-on-surface">{stat.value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="ai-glow rounded-xl p-5 bg-gradient-to-br from-white to-primary-container/5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
          <h3 className="font-bold text-primary text-sm uppercase tracking-wide">Quick Tips</h3>
        </div>
        <ul className="space-y-4">
          {quickTips.map((tip, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <p className="text-xs leading-relaxed">{tip}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl overflow-hidden h-40 relative group cursor-pointer">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5-FCVB8Jee6AfSzI7uxReygGw0fhgjHRXs3fMAHR9508jZ_wIlAbzslpSa2Qeq1mp902BQuYeriHk8dUCxce8j1xgARJMhT4VepH84zrR5lajeXig0ZNdMoCoaU6r02QhvGWb7gESIChe6TmnXPiVXiXme39750Jd-0K2ylWuZE9GWgr2YDrlpJpsIG7ruwycg9wlaaBqqzOf_g1j7IypiA8rFRI6zxUMawLzhdHzPJr5McQsJe-zSk4UjJbWIyeB-fq3tlPULsJM')` 
          }}
        ></div>
        <div className="absolute bottom-2 left-2 z-20">
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
            Current Focus: Amalfi
          </span>
        </div>
      </div>
    </aside>
  )
}

export default StatsSidebar
