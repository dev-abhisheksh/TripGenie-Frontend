import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/auth.api'
import { useQueryClient } from '@tanstack/react-query'

const Register = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const generatedUsername = formData.email.split('@')[0] + Math.floor(Math.random() * 1000)
      const res = await registerUser({
        username: generatedUsername,
        fullName: formData.name,
        email: formData.email,
        password: formData.password
      })

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token)
      }

      // Refresh current user query cache in the layout
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-surface overflow-hidden hide-scrollbar select-none">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary-container/30 to-secondary-container/20 blur-[120px] pointer-events-none animate-pulse duration-5000"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-secondary-container/30 to-primary-container/20 blur-[150px] pointer-events-none animate-pulse duration-7000"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container shadow-md shadow-primary/20 mb-3 hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-white text-3xl font-bold" style={{ fontVariationSettings: "'wght' 600" }}>
              auto_awesome
            </span>
          </div>
          <h1 className="font-display-lg text-3xl font-extrabold tracking-tight text-on-background">
            TripGenie
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Create an account to start your journey
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-2xl p-8 shadow-xl border border-white/30 backdrop-blur-xl relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Full Name</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">person</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Taylor"
                  className="w-full bg-white/50 border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">mail</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="w-full bg-white/50 border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Password</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">lock</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/50 border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Confirm Password</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">lock</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/50 border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-error font-medium flex items-center gap-1.5 bg-error/10 p-2.5 rounded-lg border border-error/20">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-bold text-sm shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-80 cursor-not-allowed scale-100' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Weaving your dashboard...</span>
                </>
              ) : (
                <span>Get Started</span>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Already have an account? <strong className="text-primary font-bold">Log in</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
