import React, { useState, useEffect, useRef } from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { updateProfile } from '../api/auth.api'
import { useQueryClient } from '@tanstack/react-query'

const Profile = () => {
  const queryClient = useQueryClient()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const fileInputRef = useRef(null)

  const [fullName, setFullName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  // Populate state when user loads
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '')
      setPreviewUrl(user.avatar || '')
    }
  }, [user])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFeedback({ type: 'error', message: 'Please select a valid image file.' })
        return
      }
      // Validate size (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFeedback({ type: 'error', message: 'Image size should be less than 5MB.' })
        return
      }

      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setFeedback({ type: '', message: '' })
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setFeedback({ type: 'error', message: 'Full name cannot be empty.' })
      return
    }

    setIsSaving(true)
    setFeedback({ type: '', message: '' })

    const formData = new FormData()
    formData.append('fullName', fullName.trim())
    if (selectedFile) {
      formData.append('avatar', selectedFile)
    }

    try {
      await updateProfile(formData)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      setFeedback({ type: 'success', message: 'Profile updated successfully!' })
      setSelectedFile(null)
    } catch (err) {
      console.error(err)
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update profile. Please try again.'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isUserLoading) {
    return (
      <div className="flex flex-col gap-8 max-w-2xl animate-pulse">
        <div className="h-8 w-48 bg-surface-variant/40 rounded-lg"></div>
        <div className="bg-white rounded-2xl p-8 shadow-md border border-outline-variant/20 h-64"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl pb-12 animate-fade-in">
      <h1 className="font-display-lg text-display-lg text-on-surface">My Profile</h1>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-outline-variant/20 flex flex-col md:flex-row gap-8 items-center md:items-start relative">
        
        {/* Profile Picture Column */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          
          {/* Avatar Container with hover overlay */}
          <div 
            onClick={triggerFileSelect}
            className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary-container/30 relative group cursor-pointer shadow-md hover:border-primary transition-all duration-300"
          >
            {previewUrl ? (
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={fullName || 'Avatar'} 
                src={previewUrl} 
              />
            ) : (
              <div className="w-full h-full bg-surface-variant/40 flex items-center justify-center text-primary/40">
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
            )}
            
            {/* Edit overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
              <span className="text-[10px] font-bold uppercase mt-1">Change</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={triggerFileSelect}
            className="text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Upload Photo</span>
          </button>

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        {/* Form Details Column */}
        <form onSubmit={handleSubmit} className="flex-1 w-full flex flex-col gap-5 text-left">
          
          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Full Name</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">person</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  if (feedback.message) setFeedback({ type: '', message: '' })
                }}
                placeholder="Alex Taylor"
                className="w-full bg-white border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Email (Read-Only) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center opacity-70">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">mail</span>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface-variant/80 cursor-not-allowed outline-none"
              />
            </div>
            <p className="text-[10px] text-on-surface-variant/60 mt-1">Contact email is linked to your login account and cannot be modified.</p>
          </div>

          {/* Username (Read-Only) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Username</label>
            <div className="relative flex items-center opacity-70">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">lock</span>
              <input
                type="text"
                value={user?.username || ''}
                readOnly
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface-variant/80 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          {/* Alert Alerts Feedback */}
          {feedback.message && (
            <div className={`text-xs font-medium flex items-center gap-1.5 p-3 rounded-xl border animate-fade-in ${
              feedback.type === 'success' 
                ? 'bg-secondary/10 border-secondary/20 text-on-secondary-container' 
                : 'bg-error/10 border-error/20 text-error'
            }`}>
              <span className="material-symbols-outlined text-sm">
                {feedback.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">save</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Profile
