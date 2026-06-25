import React, { useState } from 'react'

const ShareModal = ({ trip, onClose }) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${window.location.origin}/share/${trip.shareId || ''}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.41 1.26 4.86L2 22l5.3-1.39c1.4.76 2.98 1.19 4.7 1.19 5.51 0 9.99-4.48 9.99-9.99A9.99 9.99 0 0 0 12.012 2zm.03 17.98c-1.57 0-3.11-.42-4.45-1.22l-.32-.19-3.3.86.88-3.23-.21-.34a7.96 7.96 0 0 1-1.22-4.13c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.39-6c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06a6.56 6.56 0 0 1-1.93-1.19c-.74-.66-1.24-1.48-1.38-1.72-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42s-.54-1.3-.74-1.78c-.2-.48-.4-.41-.54-.42H8.8c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
        </svg>
      ),
      bg: 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20',
      action: () => window.open(`https://api.whatsapp.com/send?text=Check%20out%20my%20trip%20${trip.title}%20${shareUrl}`, '_blank'),
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      bg: 'bg-black/10 text-black hover:bg-black/20',
      action: () => window.open(`https://twitter.com/intent/tweet?text=Planning%20a%20trip%20to%20${trip.location}!%20Check%20it%20out%3A%20&url=${shareUrl}`, '_blank'),
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      bg: 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank'),
    },
    {
      name: 'Email',
      icon: <span className="material-symbols-outlined">mail</span>,
      bg: 'bg-primary/10 text-primary hover:bg-primary/20',
      action: () => window.open(`mailto:?subject=Trip%20Itinerary%3A%20${trip.title}&body=Hey%2C%20check%20out%20my%20trip%20to%20${trip.location}%3A%20${shareUrl}`),
    },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="bg-white rounded-20px shadow-2xl border border-outline-variant/20 p-6 w-full max-w-md mx-4 relative z-10 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-lg text-on-surface">Share this trip</h2>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-on-surface-variant hover:bg-surface-variant/50 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            close
          </button>
        </div>

        <div className="flex items-center justify-around gap-2 mb-8">
          {shareOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={opt.action}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-105 ${opt.bg}`}>
                {opt.icon}
              </div>
              <span className="text-[11px] font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
                {opt.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-sm">
          <span className="truncate select-all text-on-surface-variant font-mono font-medium max-w-[260px]">
            {shareUrl}
          </span>
          <button 
            onClick={handleCopy}
            className="bg-primary text-white font-bold text-xs py-2 px-4 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
