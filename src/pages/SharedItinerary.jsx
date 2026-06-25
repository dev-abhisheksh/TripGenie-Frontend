import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSharedItinerary } from '../hooks/useItinerary'

const SharedItinerary = () => {
  const { shareId } = useParams()
  const { data: itineraryData, isLoading, error } = useSharedItinerary(shareId)

  const itinerary = itineraryData?.itinerary

  // Helper to parse activity time and text from raw strings
  const parseActivity = (activityStr) => {
    const timeRegex = /^(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?|\d{1,2}\s*(?:AM|PM|am|pm))\s*[-:]?\s*(.*)$/
    const match = activityStr.match(timeRegex)
    if (match) {
      return {
        time: match[1],
        text: match[2]
      }
    }
    return {
      time: null,
      text: activityStr
    }
  }

  // Helper to resolve material icons based on keywords
  const getActivityIcon = (text = '') => {
    const t = text.toLowerCase()
    if (t.includes('flight') || t.includes('airport') || t.includes('fco') || t.includes('jfk') || t.includes('plane')) return 'flight_takeoff'
    if (t.includes('hotel') || t.includes('stay') || t.includes('check-in') || t.includes('check-out') || t.includes('resort') || t.includes('villa')) return 'hotel'
    if (t.includes('dinner') || t.includes('lunch') || t.includes('restaurant') || t.includes('dining') || t.includes('food') || t.includes('sponda')) return 'restaurant'
    if (t.includes('hike') || t.includes('trail') || t.includes('walking') || t.includes('sentiero')) return 'hiking'
    if (t.includes('boat') || t.includes('gozzo') || t.includes('cruise') || t.includes('ferry') || t.includes('swim') || t.includes('sea')) return 'directions_boat'
    if (t.includes('car') || t.includes('taxi') || t.includes('transfer') || t.includes('driver') || t.includes('drive')) return 'directions_car'
    if (t.includes('explore') || t.includes('visit') || t.includes('view') || t.includes('sightseeing')) return 'explore'
    return 'schedule'
  }

  // Helper to resolve icon colors
  const getIconColorClass = (iconName) => {
    switch (iconName) {
      case 'flight_takeoff': return 'text-primary bg-primary/10'
      case 'hotel': return 'text-secondary bg-secondary/10'
      case 'restaurant': return 'text-tertiary bg-tertiary/10'
      case 'hiking': return 'text-orange-600 bg-orange-50'
      case 'directions_boat': return 'text-cyan-600 bg-cyan-50'
      case 'directions_car': return 'text-indigo-600 bg-indigo-50'
      default: return 'text-outline bg-surface-variant/40'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface p-6 md:p-12 animate-pulse space-y-8">
        <div className="h-16 bg-surface-variant/40 rounded-2xl max-w-7xl mx-auto"></div>
        <div className="h-[350px] w-full bg-surface-variant/40 rounded-3xl max-w-7xl mx-auto"></div>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 max-w-7xl mx-auto">
          <div className="h-[250px] bg-surface-variant/40 rounded-3xl hidden lg:block"></div>
          <div className="space-y-6">
            <div className="h-8 w-1/3 bg-surface-variant/40 rounded-lg"></div>
            <div className="h-40 bg-surface-variant/40 rounded-3xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 text-center">
        <span className="material-symbols-outlined text-6xl text-red-500/40 mb-4">error</span>
        <h3 className="font-headline-md text-2xl text-on-surface mb-2">Shared Itinerary Not Found</h3>
        <p className="text-on-surface-variant text-sm mb-6 max-w-sm">
          The link may have expired or is incorrect. Please check the URL and try again.
        </p>
        <Link 
          to="/login" 
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-block"
        >
          Go to TripGenie Login
        </Link>
      </div>
    )
  }

  const daysList = itinerary.itineraryData?.days || []
  const tripSummary = itinerary.itineraryData?.tripSummary || ''
  const totalDays = daysList.length

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      
      {/* Public Header bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-white/70 backdrop-blur-lg border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 700" }}>auto_awesome</span>
          <h1 className="font-headline-md text-xl font-bold tracking-tight text-primary">TripGenie</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/login"
            className="text-on-surface font-semibold text-sm hover:underline px-3 py-2 transition-all"
          >
            Sign In
          </Link>
          <Link 
            to="/register"
            className="bg-primary text-white font-bold text-xs px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20"
          >
            Claim Free Account
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="material-symbols-outlined text-2xl animate-bounce">celebration</span>
            <div>
              <p className="font-bold text-sm">Someone shared this magic itinerary with you!</p>
              <p className="text-white/80 text-xs mt-0.5">Generate your own travel itineraries instantly with artificial intelligence.</p>
            </div>
          </div>
          <Link 
            to="/register"
            className="bg-white text-primary font-bold text-xs py-2 px-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            Try TripGenie Free
          </Link>
        </div>

        {/* Hero Cover */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-3xl shadow-lg border border-outline-variant/10">
          <div className="absolute inset-0 z-0">
            {itinerary.destinationImage ? (
              <img 
                src={itinerary.destinationImage} 
                alt={itinerary.location} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-primary/10 via-secondary/10 to-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-primary/10">map</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10 text-white">
            <div className="space-y-3 max-w-3xl">
              <div className="flex gap-2">
                <span className="bg-primary/30 backdrop-blur-md text-primary-fixed-dim px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                  {totalDays > 0 ? `${totalDays} Days` : 'Trip Detail'}
                </span>
                <span className="bg-tertiary/30 backdrop-blur-md text-tertiary-fixed-dim px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                  Shared
                </span>
              </div>
              
              <h2 className="font-display-lg text-3xl md:text-5xl text-white drop-shadow-md">
                {itinerary.to ? `${itinerary.to} Journey` : 'Custom Getaway'}
              </h2>
              
              <p className="text-white/90 text-sm md:text-base max-w-2xl font-light leading-relaxed">
                {tripSummary || 'Detailed AI travel itinerary woven by TripGenie.'}
              </p>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* Sidebar info */}
            <aside className="space-y-6 lg:sticky lg:top-20">
              
              <div className="bg-white rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
                <h4 className="font-headline-md text-lg text-on-surface mb-5 font-bold">Trip Overview</h4>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">location_on</span>
                    </div>
                    <div>
                      <p className="text-[11px] text-outline font-semibold uppercase tracking-wider">Destination</p>
                      <p className="font-bold text-sm text-on-surface truncate max-w-[170px]">{itinerary.location || 'Explore'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-xl">calendar_today</span>
                    </div>
                    <div>
                      <p className="text-[11px] text-outline font-semibold uppercase tracking-wider">Dates / Season</p>
                      <p className="font-bold text-sm text-on-surface truncate max-w-[170px]">{itinerary.date || 'TBD'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-xl">flight</span>
                    </div>
                    <div>
                      <p className="text-[11px] text-outline font-semibold uppercase tracking-wider">Origin</p>
                      <p className="font-bold text-sm text-on-surface truncate max-w-[170px]">{itinerary.from || 'Ticket Info'}</p>
                    </div>
                  </div>
                </div>
              </div>
            {/* Location Map Card */}
            <div className="bg-white rounded-2xl p-4 border border-outline-variant/20 shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">map</span>
                <span>Explore Map</span>
              </h4>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-outline-variant/10">
                <iframe
                  title="Destination Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(itinerary.location || itinerary.to || 'Explore')}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
            </div>
            
          </aside>

            {/* Timeline center */}
            <div className="space-y-12">
              
              {/* Route segment */}
              {itinerary.from && itinerary.to && (
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] text-outline font-bold uppercase tracking-wider">Departure</p>
                      <h3 className="font-bold text-lg text-on-surface">{itinerary.from}</h3>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 px-4">
                      <span className="material-symbols-outlined text-primary text-2xl rotate-90 md:rotate-0">
                        flight_takeoff
                      </span>
                      <div className="w-20 md:w-32 h-[2px] bg-gradient-to-r from-primary to-secondary relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <p className="text-[10px] text-outline font-bold uppercase tracking-wider">Arrival Destination</p>
                      <h3 className="font-bold text-lg text-on-surface">{itinerary.to}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Vertical timeline */}
              <div className="space-y-10 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/30 before:to-secondary/30 before:opacity-70">
                
                {daysList.map((dayObj, index) => (
                  <div key={dayObj.day || index} className="relative pl-10 group">
                    <div className="absolute left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary z-10 shadow-sm"></div>

                    <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/10 pb-4 mb-5">
                        <div>
                          <span className="text-primary font-bold text-xs uppercase tracking-wider">
                            Day {dayObj.day}
                          </span>
                          <h3 className="font-headline-md text-xl text-on-surface mt-0.5">
                            {dayObj.title || `Day ${dayObj.day} Plan`}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-5">
                        {dayObj.activities && dayObj.activities.map((act, actIdx) => {
                          const parsed = parseActivity(act)
                          const icon = getActivityIcon(parsed.text)
                          const iconColor = getIconColorClass(icon)

                          return (
                            <div key={actIdx} className="flex gap-4 items-start">
                              
                              <div className="min-w-[65px] pt-1">
                                {parsed.time ? (
                                  <span className="font-bold text-xs text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-lg whitespace-nowrap">
                                    {parsed.time}
                                  </span>
                                ) : (
                                  <span className="font-bold text-xs text-outline bg-surface-variant/40 px-2 py-0.5 rounded-lg whitespace-nowrap">
                                    --:--
                                  </span>
                                )}
                              </div>

                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
                                <span className="material-symbols-outlined text-lg">
                                  {icon}
                                </span>
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-semibold text-on-surface">
                                  {parsed.text}
                                </p>
                              </div>

                            </div>
                          )
                        })}
                      </div>

                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Public Footer */}
      <footer className="bg-white border-t border-outline-variant/10 py-6 text-center text-xs text-on-surface-variant">
        <p>© 2026 TripGenie. All rights reserved. Created with love & artificial intelligence.</p>
      </footer>

    </div>
  )
}

export default SharedItinerary
