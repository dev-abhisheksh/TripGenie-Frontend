import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ItineraryCard from '../components/dashboard/ItineraryCard'
import ShareModal from '../components/dashboard/ShareModal'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useAllItineraries } from '../hooks/useAllItineraries'

const Home = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [activeShareTrip, setActiveShareTrip] = useState(null)
  const fileInputRef = useRef(null)
  const location = useLocation()
  const { data: user, isLoading, error } = useCurrentUser()
  const { data: itineraries, isLoading: isItinerariesLoading } = useAllItineraries()

  useEffect(() => {
    if (location.state?.triggerUpload) {
      fileInputRef.current?.click()
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedFiles(prev => [...prev, ...files.map(f => f.name)])
    }
  }

  const handleFileBrowse = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files.map(f => f.name)])
    }
  }

  return (
    <div className="flex flex-col gap-12">
      <section>
        <div className="relative overflow-hidden rounded-20px bg-gradient-to-br from-primary-container to-secondary-container p-6 md:p-12 text-on-primary-container shadow-lg">
          <div className="relative z-10">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">Welcome back, {user?.fullName}</h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-xl">
              Where shall your curiosity lead you today? Upload your travel documents and let Genie weave your perfect itinerary.
            </p>

            <div className="mt-6 group">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border border-dashed border-on-primary-container/30 bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${isDragging
                    ? 'bg-white/30 border-on-primary-container/60 scale-[1.01]'
                    : 'hover:bg-white/20 hover:border-on-primary-container/50'
                  }`}
              >
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <span className="material-symbols-outlined text-2xl text-on-primary-container">cloud_upload</span>
                  <div>
                    <p className="font-semibold text-sm">Drag &amp; drop travel documents here</p>
                    <p className="text-xs opacity-75">PDF, JPEG, or PNG (Max 10MB)</p>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />

                <button
                  onClick={handleFileBrowse}
                  className="bg-white text-primary px-5 py-2 rounded-lg font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  Browse Files
                </button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-3 bg-white/10 rounded-xl p-3 border border-white/20">
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-primary-container">Uploaded Documents:</p>
                  <ul className="text-xs space-y-1 text-on-primary-container">
                    {uploadedFiles.map((fileName, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">description</span>
                        <span className="truncate">{fileName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Recent Itineraries</h2>
            <p className="text-on-surface-variant">Your upcoming and past travel plans managed by AI.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline cursor-pointer group">
            View All Trips
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isItinerariesLoading ? (
            // Skeleton Loader Cards
            [1, 2].map((i) => (
              <div key={i} className="bg-white rounded-20px overflow-hidden shadow-md border border-outline-variant/10 animate-pulse flex flex-col h-full">
                <div className="h-56 w-full bg-surface-variant/40"></div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-surface-variant/40 rounded"></div>
                  <div className="h-4 w-full bg-surface-variant/40 rounded"></div>
                  <div className="h-4 w-2/3 bg-surface-variant/40 rounded mt-auto"></div>
                </div>
              </div>
            ))
          ) : itineraries?.data?.itineraries && itineraries.data.itineraries.length > 0 ? (
            // Real Itineraries from Backend
            itineraries.data.itineraries.slice(0, 2).map((item) => (
              <ItineraryCard
                key={item._id}
                title={item.to ? `${item.to} Journey` : 'Custom Getaway'}
                description={item.itineraryData?.tripSummary || 'Detailed AI travel itinerary by TripGenie.'}
                dates={item.date || 'Dates TBD'}
                location={item.location || item.to || 'Explore'}
                image={item.destinationImage || null} // Uses Pexels location image if available, else placeholder
                status="Upcoming"
                actionText="View Itinerary"
                onShare={setActiveShareTrip}
              />
            ))
          ) : (
            // Empty State
            <div className="col-span-full py-16 px-6 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-md rounded-20px border border-outline-variant/30 shadow-sm">
              <span className="material-symbols-outlined text-5xl text-primary/40 mb-3" style={{ fontVariationSettings: "'wght' 200" }}>map_search</span>
              <h3 className="font-display-lg text-xl font-bold text-on-surface mb-2">No itineraries yet</h3>
              <p className="text-on-surface-variant text-sm max-w-sm">
                Upload your travel documents above, and TripGenie will parse them to build your custom itinerary.
              </p>
            </div>
          )}
        </div>
      </section>

      {activeShareTrip && (
        <ShareModal
          trip={activeShareTrip}
          onClose={() => setActiveShareTrip(null)}
        />
      )}
    </div>
  )
}

export default Home