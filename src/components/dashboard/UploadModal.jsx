import React, { useState, useRef } from 'react'

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0])
      onClose()
    }
  }

  const handleFileBrowse = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0])
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-outline-variant/20 p-8 w-full max-w-lg relative z-10 animate-[fadeIn_0.3s_ease-out] flex flex-col gap-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 material-symbols-outlined text-outline hover:text-on-surface hover:bg-surface-variant/45 p-2 rounded-full cursor-pointer transition-all duration-300"
        >
          close
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4 relative">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 500" }}>
              auto_awesome
            </span>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-secondary rounded-full animate-pulse border-2 border-white"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-on-surface font-headline-md tracking-tight">
            Weave New Itinerary
          </h3>
          <p className="text-sm text-on-surface-variant mt-2 max-w-sm mx-auto">
            Upload your travel tickets, flight confirmations, hotel bookings, or PDF reservation details, and let Genie generate your custom plan.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileBrowse}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/5 scale-[0.99] shadow-inner' 
              : 'border-outline-variant/60 bg-surface-container-low hover:bg-surface-container-high/60 hover:border-primary/50'
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragging ? 'bg-primary/20 text-primary scale-110' : 'bg-surface-variant/50 text-outline'
          }`}>
            <span className="material-symbols-outlined text-3xl">
              {isDragging ? 'download' : 'upload_file'}
            </span>
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-on-surface">
              Drag & drop document here, or <span className="text-primary hover:underline">browse files</span>
            </p>
            <p className="text-xs text-on-surface-variant mt-1.5">
              Supports PDF, DOCX, Images, or TXT (Max 10MB)
            </p>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
          />
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-2 gap-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/10 text-xs">
          <div className="flex gap-2 items-start text-left">
            <span className="material-symbols-outlined text-primary text-base">security</span>
            <div>
              <p className="font-semibold text-on-surface">Secure Parsing</p>
              <p className="text-on-surface-variant mt-0.5">Your files are processed privately and deleted afterwards.</p>
            </div>
          </div>
          <div className="flex gap-2 items-start text-left">
            <span className="material-symbols-outlined text-primary text-base">bolt</span>
            <div>
              <p className="font-semibold text-on-surface">Instant Gen</p>
              <p className="text-on-surface-variant mt-0.5">Ready in seconds. Formats location and retrieves dynamic photos.</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 mt-2">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-variant/30 active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={handleFileBrowse}
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 cursor-pointer"
          >
            Select File
          </button>
        </div>

      </div>
    </div>
  )
}

export default UploadModal
