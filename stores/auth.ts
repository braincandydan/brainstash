import { defineStore } from 'pinia'

interface User {
  id?: string
  username: string
  email: string
  bio?: string
  stats?: {
    collections: number
    bookmarks: number
    followers: number
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) throw new Error('Login failed')

        const data = await response.json()
        localStorage.setItem('token', data.token)
        this.user = data.user
        this.isAuthenticated = true
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async register(username: string, email: string, password: string) {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        })

        if (!response.ok) throw new Error('Registration failed')

        const data = await response.json()
        localStorage.setItem('token', data.token)
        this.user = data.user
        this.isAuthenticated = true
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },

    async fetchProfile() {
      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (!response.ok) throw new Error('Failed to fetch profile')
        
        const data = await response.json()
        this.user = data
      } catch (error) {
        console.error('Error fetching profile:', error)
        throw error
      }
    },

    async updateProfile(profileData: Partial<User>) {
      try {
        const response = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(profileData)
        })

        if (!response.ok) throw new Error('Failed to update profile')

        const data = await response.json()
        this.user = data
      } catch (error) {
        console.error('Error updating profile:', error)
        throw error
      }
    },

    logout() {
      localStorage.removeItem('token')
      this.user = null
      this.isAuthenticated = false
    }
  }
}) 