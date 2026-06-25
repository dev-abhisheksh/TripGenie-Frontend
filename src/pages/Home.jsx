import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ItineraryCard from '../components/dashboard/ItineraryCard'
import ShareModal from '../components/dashboard/ShareModal'

const Home = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [activeShareTrip, setActiveShareTrip] = useState(null)
  const fileInputRef = useRef(null)
  const location = useLocation()

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

  const itineraries = [
    {
      title: 'Amalfi Coast Escape',
      description: 'Exploring Positano, Ravello, and the hidden grottoes of the coast with a curated local food tour.',
      dates: 'Aug 12 - Aug 19',
      location: 'Italy',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpgeR1UhbOKWKrko4nT3xJukGI6fujwuZqnrQbiMDxpwVHaI7_vCQAFS_b0DtxRXN4Ne03P_EAFc_pi3rNMiHTeOJj0JitQwxLD7E-0_njabQKDIzmae7zYmp3BrbFDbZJM2lqAN2Jk8LT59Z8FSWdBPysidL9ggqxHpI8bigBngTvKfLTnbwWoPOcPgK3-up75wvSgml7mEaL_MXfuX36aVfZnHK3VFcpwOF99rLkiZDPRlNNnFY5ELdcRYAWGFkne4KCuDL79Y3c',
      status: 'Upcoming',
      actionText: 'View Itinerary',
    },
    {
      title: 'Tokyo Transit',
      description: 'A high-tech immersion through Akihabara, Tsukiji Market, and the tranquil shrines of Meiji-jingu.',
      dates: 'June 04 - June 10',
      location: 'Japan',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoitR2eq1cKObxuhnIX635Nc1BChGuxzeCl4pxOFy5rluE1faCFJPx8hhQDw72Hnqb3uish273H_KkJfPcHiF5LRvpUbJyU7KqSv7uPGoDwN98grpjLM_EgXAT15wkxhY4VkCffRAbL8g3I-ZgA_6MZbzP08UfVE4kipLbpuxm0TKcHl00C8FOvIGYQfh_Uo1NCftT-PUqD3Yk80x47WLzrOY5WEOXmb4LwO0yMs2YleIeenj-tEd5nue35xs29UCxOQkobAHgs0ke',
      status: 'Completed',
      actionText: 'View Summary',
    },
  ]

  return (
    <div className="flex flex-col gap-12">
      <section>
        <div className="relative overflow-hidden rounded-20px bg-gradient-to-br from-primary-container to-secondary-container p-6 md:p-12 text-on-primary-container shadow-lg">
          <div className="relative z-10">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">Welcome back, Alex</h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-xl">
              Where shall your curiosity lead you today? Upload your travel documents and let Genie weave your perfect itinerary.
            </p>

            <div className="mt-6 group">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border border-dashed border-on-primary-container/30 bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
                  isDragging 
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {itineraries.map((itinerary, idx) => (
            <ItineraryCard 
              key={idx}
              title={itinerary.title}
              description={itinerary.description}
              dates={itinerary.dates}
              location={itinerary.location}
              image={itinerary.image}
              status={itinerary.status}
              actionText={itinerary.actionText}
              onShare={setActiveShareTrip}
            />
          ))}
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