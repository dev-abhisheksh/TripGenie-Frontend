import React, { useState, useRef } from 'react'
import ItineraryCard from '../components/dashboard/ItineraryCard'

const Home = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileInputRef = useRef(null)

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
        <div className="relative overflow-hidden rounded-20px bg-gradient-to-br from-primary-container to-secondary-container p-12 text-on-primary-container shadow-lg">
          <div className="relative z-10">
            <h1 className="font-display-lg text-display-lg mb-4">Welcome back, Alex</h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-xl">
              Where shall your curiosity lead you today? Upload your travel documents and let Genie weave your perfect itinerary.
            </p>

            <div className="mt-8 group">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed border-on-primary-container/30 bg-white/10 backdrop-blur-md rounded-20px p-8 flex flex-col items-center justify-center transition-all duration-300 ${
                  isDragging 
                    ? 'bg-white/30 border-on-primary-container/60 scale-[1.02]' 
                    : 'hover:bg-white/20 hover:border-on-primary-container/50'
                }`}
              >
                <span className="material-symbols-outlined text-5xl mb-4">cloud_upload</span>
                <p className="font-headline-md text-lg mb-2">Drag &amp; drop travel documents here</p>
                <p className="text-sm opacity-70 mb-4">PDF, JPEG, or PNG (Max 10MB)</p>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  multiple
                />
                
                <button 
                  onClick={handleFileBrowse}
                  className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Browse Files
                </button>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 w-full max-w-md bg-white/10 rounded-xl p-3 border border-white/20">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-primary-container">Uploaded Documents:</p>
                    <ul className="text-sm space-y-1 text-on-primary-container">
                      {uploadedFiles.map((fileName, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">description</span>
                          <span className="truncate">{fileName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home