<template>
  <div class="min-h-screen bg-brain-50">
    <TheHeader />
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { supabase } from '~/utils/supabase'
import TheHeader from '~/components/layout/TheHeader.vue'

const auth = useAuthStore()

onMounted(async () => {
  // Check for existing session on page load
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    auth.user = profile
    auth.isAuthenticated = true
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event)
    
    if (session) {
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      auth.user = profile
      auth.isAuthenticated = true
    } else {
      auth.user = null
      auth.isAuthenticated = false
    }
  })
})
</script>