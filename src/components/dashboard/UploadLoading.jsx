import React, { useState, useEffect } from 'react'

const UploadLoading = () => {
  const [progress, setProgress] = useState(35)
  const [progressText, setProgressText] = useState('Analyzing destinations...')

  const steps = [
    { p: 35, t: "Analyzing destinations..." },
    { p: 58, t: "Fetching hidden gems..." },
    { p: 72, t: "Optimizing travel routes..." },
    { p: 89, t: "Calculating best vibes..." },
    { p: 98, t: "Finalizing your magic itinerary..." }
  ]

  useEffect(() => {
    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const { p, t } = steps[currentStep]
        setProgress(p)
        setProgressText(t)
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, 1800 + Math.random() * 1000)

    // Lock body scrollbars
    document.body.style.overflow = 'hidden'

    return () => {
      clearInterval(interval)
      // Unlock body scrollbars
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="max-w-xl mx-auto py-6 animate-fade-in">
      {/* Hero Section Loading */}
      <div className="fade-in-up mb-10">
        <div className="h-8 w-48 skeleton rounded-lg mb-4"></div>
        <div className="h-12 w-full skeleton rounded-xl mb-3"></div>
        <div className="h-12 w-3/4 skeleton rounded-xl mb-8"></div>
        
        {/* AI Progress Indicator */}
        <div className="aurora-border rounded-2xl shadow-lg">
          <div className="bg-surface rounded-[14px] p-6 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <span className="material-symbols-outlined text-primary text-5xl pulse-soft animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary rounded-full animate-ping"></div>
            </div>
            
            <h2 className="font-headline-md text-xl font-bold text-on-surface mb-2">
              AI is generating your magic itinerary...
            </h2>
            <p className="text-on-surface-variant text-sm mb-6">
              Curating hidden gems and optimal routes based on your vibes.
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-primary transition-all duration-700 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="w-full flex justify-between">
              <span className="font-label-sm text-xs font-semibold text-primary">
                {progressText}
              </span>
              <span className="font-label-sm text-xs text-outline font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Cards Grid (Skeleton) */}
      <div className="space-y-6">
        <div className="flex justify-between items-end mb-4">
          <div className="h-6 w-32 skeleton rounded-md"></div>
          <div className="h-4 w-16 skeleton rounded-md"></div>
        </div>
        
        {/* Bento Skeleton Card 1 */}
        <div className="bg-white border border-outline-variant/20 rounded-3xl p-6 shadow-sm overflow-hidden relative">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <div className="h-7 w-40 skeleton rounded-md"></div>
              <div className="h-4 w-24 skeleton rounded-md"></div>
            </div>
            <div className="h-10 w-10 skeleton rounded-full"></div>
          </div>
          <div className="aspect-video w-full skeleton rounded-2xl mb-6"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-8 w-20 skeleton rounded-full"></div>
            <div className="h-8 w-24 skeleton rounded-full"></div>
            <div className="h-8 w-16 skeleton rounded-full"></div>
          </div>
          <div className="h-12 w-full skeleton rounded-xl"></div>
        </div>

        {/* Bento Skeleton Card 2 */}
        <div className="bg-white border border-outline-variant/20 rounded-3xl p-6 shadow-sm overflow-hidden relative">
          <div className="flex gap-4 items-center mb-6">
            <div className="h-16 w-16 skeleton rounded-2xl flex-shrink-0"></div>
            <div className="space-y-2 w-full">
              <div className="h-6 w-3/4 skeleton rounded-md"></div>
              <div className="h-4 w-1/2 skeleton rounded-md"></div>
            </div>
          </div>
          <div className="h-24 w-full skeleton rounded-2xl"></div>
        </div>

        {/* Bento Skeleton Card 3 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-outline-variant/20 rounded-3xl p-4 shadow-sm h-40">
            <div className="h-8 w-8 skeleton rounded-full mb-4"></div>
            <div className="h-5 w-full skeleton rounded-md mb-2"></div>
            <div className="h-3 w-2/3 skeleton rounded-md"></div>
          </div>
          <div className="bg-white border border-outline-variant/20 rounded-3xl p-4 shadow-sm h-40">
            <div className="h-8 w-8 skeleton rounded-full mb-4"></div>
            <div className="h-5 w-full skeleton rounded-md mb-2"></div>
            <div className="h-3 w-2/3 skeleton rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadLoading
