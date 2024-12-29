<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-brain-900 mb-6">Create Account</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-brain-700 mb-2" for="username">Username</label>
          <input 
            v-model="username"
            type="text" 
            id="username"
            class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            required
          >
        </div>
        <div>
          <label class="block text-brain-700 mb-2" for="email">Email</label>
          <input 
            v-model="email"
            type="email" 
            id="email"
            class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            required
          >
        </div>
        <div>
          <label class="block text-brain-700 mb-2" for="password">Password</label>
          <input 
            v-model="password"
            type="password" 
            id="password"
            class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            required
            minlength="8"
          >
          <p class="text-sm text-brain-600 mt-1">Must be at least 8 characters</p>
        </div>
        <div>
          <label class="block text-brain-700 mb-2" for="confirmPassword">Confirm Password</label>
          <input 
            v-model="confirmPassword"
            type="password" 
            id="confirmPassword"
            class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            required
          >
        </div>
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        <button 
          type="submit"
          class="w-full bg-stash-500 text-white py-2 rounded-lg hover:bg-stash-600"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Creating Account...' : 'Create Account' }}
        </button>
        <p class="text-center text-brain-600">
          Already have an account? 
          <NuxtLink to="/login" class="text-stash-500 hover:text-stash-600">
            Login here
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    // Basic validation
    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }

    if (password.value.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    console.log('Starting registration...') // Debug log

    await auth.register(username.value, email.value, password.value)
    
    console.log('Registration successful!') // Debug log
    
    // Only redirect if we successfully registered
    router.push('/')
  } catch (e) {
    console.error('Registration error:', e) // Debug log
    error.value = e.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script> 