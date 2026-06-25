import React from 'react'

const ItineraryCard = ({ 
  title, 
  description, 
  dates, 
  location, 
  image, 
  status, 
  actionText,
  onShare
}) => {
  const isUpcoming = status?.toLowerCase() === 'upcoming'
  
  return (
    <div className="group bg-white rounded-20px overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full">
      <div className="h-56 relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center border-b border-outline-variant/10">
        {image ? (
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt={title} 
            src={image} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-primary/60 w-full h-full">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'wght' 300" }}>map</span>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-2 text-primary/50">TripGenie Preview</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              isUpcoming 
                ? 'bg-tertiary-container text-on-tertiary-container' 
                : 'bg-outline-variant text-on-surface'
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-xl text-on-surface">{title}</h3>
          <button 
            onClick={() => onShare?.({ title, location })}
            className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-variant/20 border-none outline-none"
          >
            share
          </button>
        </div>
        
        <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-xs text-outline mb-6">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span>{dates}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{location}</span>
          </div>
        </div>
        
        <button className="mt-auto w-full py-3 bg-surface-container-high text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          {actionText}
        </button>
      </div>
    </div>
  )
}

export default ItineraryCard
