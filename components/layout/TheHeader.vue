<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-xl font-bold text-brain-900">Brain<span class="text-stash-500">Stash</span></span>
        </NuxtLink>

        <!-- Navigation -->
        <div class="flex items-center space-x-6">
          <NuxtLink to="/explore" class="text-brain-600 hover:text-brain-900">Explore</NuxtLink>
          <NuxtLink to="/collections" class="text-brain-600 hover:text-brain-900">Collections</NuxtLink>
          
          <!-- Auth Navigation -->
          <template v-if="auth.isAuthenticated">
            <span class="text-brain-600">Welcome, {{ auth.user?.username }}</span>
            <button 
              @click="handleLogout"
              class="text-brain-600 hover:text-brain-900"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-brain-600 hover:text-brain-900">Login</NuxtLink>
            <NuxtLink 
              to="/register" 
              class="bg-stash-500 text-white px-4 py-2 rounded-lg hover:bg-stash-600"
            >
              Sign Up
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/')
}
</script> 