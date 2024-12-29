<template>
  <div class="min-h-screen bg-brain-50">
    <TheHeader />
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import TheHeader from '~/components/layout/TheHeader.vue'

const { $supabase } = useNuxtApp()
const auth = useAuthStore()

onMounted(async () => {
  // Check initial session
  const { data: { session } } = await $supabase.auth.getSession()
  
  if (session?.user) {
    const { data: profile } = await $supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    if (profile) {
      auth.user = profile
      auth.isAuthenticated = true
    }
  }

  // Listen for auth changes
  $supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const { data: profile } = await $supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (profile) {
        auth.user = profile
        auth.isAuthenticated = true
      }
    } else {
      auth.user = null
      auth.isAuthenticated = false
    }
  })
})
</script>