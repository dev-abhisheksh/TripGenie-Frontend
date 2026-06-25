import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ItineraryCard from '../components/dashboard/ItineraryCard'
import ShareModal from '../components/dashboard/ShareModal'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useAllItineraries } from '../hooks/useAllItineraries'

import { useQueryClient } from '@tanstack/react-query'
import { uploadItinerary } from '../api/itinerary.api'
import UploadLoading from '../components/dashboard/UploadLoading'
import UploadModal from '../components/dashboard/UploadModal'

const Home = () => {
  const queryClient = useQueryClient()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [activeShareTrip, setActiveShareTrip] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const location = useLocation()
  const { data: user, isLoading, error } = useCurrentUser()
  const { data: itineraries, isLoading: isItinerariesLoading } = useAllItineraries()

  useEffect(() => {
    if (isUploading) {
      setShowLoading(true)
      setIsFadingOut(false)
    } else if (showLoading) {
      setIsFadingOut(true)
      const timer = setTimeout(() => {
        setShowLoading(false)
        setIsFadingOut(false)
      }, 700) // matches duration-700
      return () => clearTimeout(timer)
    }
  }, [isUploading, showLoading])

  useEffect(() => {
    if (location.state?.triggerUpload) {
      setIsUploadModalOpen(true)
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleUpload = async (file) => {
    setIsUploading(true)
    setUploadError('')
    const formData = new FormData()
    formData.append('document', file)

    try {
      await uploadItinerary(formData)
      queryClient.invalidateQueries({ queryKey: ['allItineraries'] })
      setUploadedFiles(prev => [...prev, file.name])
    } catch (err) {
      console.error(err)
      setUploadError(err.response?.data?.message || `Failed to parse ${file.name}. Ensure it is a valid travel ticket or PDF.`)
    } finally {
      setIsUploading(false)
    }
  }

  if (showLoading) {
    return (
      <div className={`transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <UploadLoading />
      </div>
    )
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

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-6 bg-white text-primary px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border-none outline-none"
            >
              <span className="material-symbols-outlined font-bold">add_circle</span>
              <span>Weave New Itinerary</span>
            </button>

            {uploadError && (
              <div className="mt-4 bg-red-500/20 rounded-xl p-3 border border-red-500/30 text-xs text-red-100 flex items-center gap-2 max-w-xl">
                <span className="material-symbols-outlined text-sm shrink-0">error</span>
                <span>{uploadError}</span>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-4 bg-white/10 rounded-xl p-3 border border-white/20 max-w-sm">
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
                id={item._id}
                title={item.to ? `${item.to} Journey` : 'Custom Getaway'}
                description={item.itineraryData?.tripSummary || 'Detailed AI travel itinerary by TripGenie.'}
                dates={item.date || 'Dates TBD'}
                location={item.location || item.to || 'Explore'}
                image={item.destinationImage || null} // Uses Pexels location image if available, else placeholder
                status="Upcoming"
                actionText="View Itinerary"
                shareId={item.shareId}
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

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  )
}

export default Home