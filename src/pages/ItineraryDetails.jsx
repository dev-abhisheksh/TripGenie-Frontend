import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useItinerary } from '../hooks/useItinerary'
import ShareModal from '../components/dashboard/ShareModal'

const ItineraryDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: itineraryData, isLoading, error } = useItinerary(id)
  const [activeShareTrip, setActiveShareTrip] = useState(null)

  const itinerary = itineraryData?.itinerary

  // Helper to parse activity time and text from raw strings
  const parseActivity = (activityStr) => {
    // Matches times like "10:30", "10:30 AM", "14:00 Check-in", "9:00 - Flight", "Dinner at 20:00"
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

  // Helper to resolve material icons based on keywords in activity text
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
      <div className="flex flex-col gap-8 animate-pulse">
        {/* Hero Loading skeleton */}
        <div className="h-[300px] md:h-[400px] w-full bg-surface-variant/40 rounded-3xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="h-[250px] bg-surface-variant/40 rounded-3xl hidden lg:block"></div>
          <div className="space-y-6">
            <div className="h-8 w-1/3 bg-surface-variant/40 rounded-lg"></div>
            <div className="h-40 bg-surface-variant/40 rounded-3xl"></div>
            <div className="h-40 bg-surface-variant/40 rounded-3xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !itinerary) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-6xl text-red-500/40 mb-4">error</span>
        <h3 className="font-headline-md text-2xl text-on-surface mb-2">Itinerary Not Found</h3>
        <p className="text-on-surface-variant text-sm mb-6">
          {error?.response?.data?.message || 'We could not fetch this itinerary. It might have been deleted or you do not have permission to view it.'}
        </p>
        <Link 
          to="/trips" 
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-block"
        >
          Back to My Trips
        </Link>
      </div>
    )
  }

  const daysList = itinerary.itineraryData?.days || []
  const tripSummary = itinerary.itineraryData?.tripSummary || ''
  const totalDays = daysList.length

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Back Button & Share Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/trips')}
          className="flex items-center gap-2 text-primary font-bold hover:underline cursor-pointer group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span>Back to Trips</span>
        </button>

        <button 
          onClick={() => setActiveShareTrip({
            title: itinerary.to ? `${itinerary.to} Journey` : 'Custom Getaway',
            location: itinerary.location || itinerary.to || 'Explore',
            shareId: itinerary.shareId
          })}
          className="flex items-center gap-2 bg-white hover:bg-surface-variant/20 border border-outline-variant/30 text-primary px-4 py-2 rounded-xl text-sm shadow-sm transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-base">share</span>
          <span>Share Trip</span>
        </button>
      </div>

      {/* Hero Banner Section */}
      <section className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-3xl shadow-lg border border-outline-variant/10">
        <div className="absolute inset-0 z-0">
          {itinerary.destinationImage ? (
            <img 
              src={itinerary.destinationImage} 
              alt={itinerary.location} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-primary/10 via-secondary/10 to-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-9xl text-primary/10">map</span>
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
                AI Genie Curated
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

      {/* Main Grid content */}
      <section className="max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* Left Sidebar: Trip Overview */}
          <aside className="space-y-6 lg:sticky lg:top-20">
            
            {/* Overview Card */}
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

            {/* AI Insights Card */}
            <div className="bg-gradient-to-br from-tertiary-container/5 to-primary-container/5 rounded-2xl p-6 border border-primary/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-2 mb-3 text-primary relative z-10">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <span className="font-bold text-xs uppercase tracking-wider">Genie AI Insight</span>
              </div>
              
              <p className="text-on-surface-variant text-xs italic leading-relaxed relative z-10">
                "Based on your travel to {itinerary.location || 'this destination'}, local cafes and walking routes are highly rated. Wear comfortable shoes and keep offline maps handy."
              </p>
            </div>
            
          </aside>

          {/* Timeline Center Content */}
          <div className="space-y-12">
            
            {/* Travel Routing Card */}
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

                <div className="bg-white/60 backdrop-blur-sm px-4 py-3.5 rounded-xl border border-outline-variant/30 text-center md:text-right">
                  <p className="text-[10px] text-outline font-bold uppercase">Travel Dates</p>
                  <p className="font-bold text-xs text-primary mt-0.5">{itinerary.date || 'Flexible Dates'}</p>
                </div>
              </div>
            )}

            {/* Vertical timeline elements */}
            <div className="space-y-10 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/30 before:to-secondary/30 before:opacity-70">
              
              {daysList.map((dayObj, index) => (
                <div key={dayObj.day || index} className="relative pl-10 group">
                  
                  {/* Timeline bullet dot */}
                  <div className="absolute left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary group-hover:scale-125 transition-transform duration-300 z-10 shadow-sm"></div>

                  <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300">
                    
                    {/* Header */}
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

                    {/* Activities List */}
                    <div className="space-y-5">
                      {dayObj.activities && dayObj.activities.map((act, actIdx) => {
                        const parsed = parseActivity(act)
                        const icon = getActivityIcon(parsed.text)
                        const iconColor = getIconColorClass(icon)

                        return (
                          <div key={actIdx} className="flex gap-4 items-start">
                            
                            {/* Time / Left Badge */}
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

                            {/* Icon Wrapper */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
                              <span className="material-symbols-outlined text-lg">
                                {icon}
                              </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-on-surface">
                                {parsed.text}
                              </p>
                            </div>

                          </div>
                        )
                      })}
                    </div>

                    {/* Dynamic AI Alternative Card (e.g. for mid-trip details) */}
                    {index === 1 && itinerary.location && (
                      <div className="mt-6 p-5 rounded-2xl bg-surface-container-low border border-dashed border-primary/30 flex flex-col gap-2.5">
                        <div className="flex items-center gap-2 text-primary">
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            auto_awesome
                          </span>
                          <span className="font-bold text-xs uppercase tracking-wider">AI Alternative Option</span>
                        </div>
                        <p className="text-on-surface-variant text-xs leading-relaxed">
                          "Day 2 highlights in {itinerary.location} may have peak crowds. Consider a private tour or early morning slot to get clear photos."
                        </p>
                      </div>
                    )}

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* Share Modal container */}
      {activeShareTrip && (
        <ShareModal 
          trip={activeShareTrip} 
          onClose={() => setActiveShareTrip(null)} 
        />
      )}

    </div>
  )
}

export default ItineraryDetails
