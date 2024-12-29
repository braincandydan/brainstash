<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-brain-900 mb-6">Login</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-brain-700 mb-2" for="email">Email</label>
          <input 
            v-model="email"
            type="email" 
            id="email"
            class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
          >
        </div>
        <div>
          <label class="block text-brain-700 mb-2" for="password">Password</label>
          <input 
            v-model="password"
            type="password" 
            id="password"
            class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
          >
        </div>
        <button 
          type="submit"
          class="w-full bg-stash-500 text-white py-2 rounded-lg hover:bg-stash-600"
        >
          Login
        </button>
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

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script> 
