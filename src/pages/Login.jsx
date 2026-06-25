import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { loginUser } from '../api/auth.api'

const Login = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await loginUser(formData)

      // Refresh current user query cache in the layout
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })

      // Navigate to Dashboard
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-surface overflow-hidden hide-scrollbar select-none">
      {/* Ambient background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary-container/30 to-secondary-
  container/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-secondary-container/30 to-primary-
  container/20 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container shadow-md
  shadow-primary/20 mb-3">
            <span className="material-symbols-outlined text-white text-3xl font-bold">auto_awesome</span>
          </div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-background">TripGenie</h1>
          <p className="text-on-surface-variant text-sm mt-1">Let Genie weave your perfect itinerary</p>
        </div>

        {/* Form card */}
        <div className="glass-panel rounded-2xl p-8 shadow-xl border border-white/30 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">mail</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="w-full bg-white/50 border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-
  primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-on-surface/75 uppercase tracking-wider">Password</label>
                <button type="button" className="text-[11px] text-primary hover:underline font-semibold cursor-pointer">Forgot?</button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">lock</span>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/50 border border-outline-variant/40 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-
  primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-error font-medium flex items-center gap-1.5 bg-error/10 p-2.5 rounded-lg border border-error/20 animate-
  pulse">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/95 text-white font-bold text-sm shadow-md hover:scale-[1.02]
  active:scale-98 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Unlocking Genie...' : 'Unlock Genie'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/register" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
              Don't have an account? <strong className="text-primary font-bold">Sign up</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login