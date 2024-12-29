import { defineStore } from 'pinia'
import { supabase } from '~/utils/supabase'

interface User {
  id: string
  username: string
  email: string
  bio?: string
  stats: {
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
    async register(username: string, email: string, password: string) {
      try {
        // 1. Create the user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username } // Store username in user metadata
          }
        })

        if (authError) throw authError

        if (authData.user) {
          // 2. Create the user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                username,
                email,
                stats: {
                  collections: 0,
                  bookmarks: 0,
                  followers: 0
                }
              }
            ])
            .select()
            .single()

          if (profileError) throw profileError

          this.user = profile
          this.isAuthenticated = true
        }
      } catch (error: any) {
        console.error('Registration error:', error)
        throw error
      }
    },

    async login(email: string, password: string) {
      try {
        const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (authError) throw authError

        if (user) {
          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError) throw profileError

          this.user = profile
          this.isAuthenticated = true
        }
      } catch (error: any) {
        console.error('Login error:', error)
        throw error
      }
    },

    async logout() {
      try {
        await supabase.auth.signOut()
        this.user = null
        this.isAuthenticated = false
      } catch (error: any) {
        console.error('Logout error:', error)
        throw error
      }
    }
  }
}) 