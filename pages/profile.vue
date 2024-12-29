<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-stash-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
      <button 
        @click="retryLoad"
        class="ml-4 text-sm underline"
      >
        Try Again
      </button>
    </div>

    <!-- Content -->
    <div v-else class="max-w-3xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold text-brain-900 mb-2">
              {{ auth.user?.username }}
            </h1>
            <p class="text-brain-600">{{ auth.user?.email }}</p>
          </div>
          <button 
            @click="isEditing = true"
            v-if="!isEditing"
            class="bg-brain-500 text-white px-4 py-2 rounded-lg hover:bg-brain-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Edit Profile Form -->
      <div v-if="isEditing" class="bg-white rounded-lg shadow p-6 mb-6">
        <form @submit.prevent="handleUpdateProfile" class="space-y-4">
          <div>
            <label class="block text-brain-700 mb-2" for="username">Username</label>
            <input 
              v-model="form.username"
              type="text" 
              id="username"
              class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-brain-700 mb-2" for="email">Email</label>
            <input 
              v-model="form.email"
              type="email" 
              id="email"
              class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-brain-700 mb-2" for="bio">Bio</label>
            <textarea 
              v-model="form.bio"
              id="bio"
              rows="3"
              class="w-full p-2 border border-brain-200 rounded focus:ring-2 focus:ring-stash-500 focus:border-transparent"
            ></textarea>
          </div>
          <div class="flex space-x-4">
            <button 
              type="submit"
              class="bg-stash-500 text-white px-4 py-2 rounded-lg hover:bg-stash-600"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Saving...' : 'Save Changes' }}
            </button>
            <button 
              type="button"
              @click="cancelEdit"
              class="bg-gray-200 text-brain-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-brain-900">0</div>
          <div class="text-brain-600">Collections</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-brain-900">0</div>
          <div class="text-brain-600">Bookmarks</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-brain-900">0</div>
          <div class="text-brain-600">Followers</div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-brain-900 mb-4">Recent Activity</h2>
        <div class="text-brain-600 text-center py-8">
          No recent activity
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isEditing = ref(false)
const isLoading = ref(true)
const error = ref('')

const loadProfile = async () => {
  try {
    isLoading.value = true
    error.value = ''
    await auth.fetchProfile()
  } catch (e) {
    error.value = 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
}

const retryLoad = () => {
  loadProfile()
}

onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }
  loadProfile()
})

const form = ref({
  username: auth.user?.username || '',
  email: auth.user?.email || '',
  bio: auth.user?.bio || ''
})

const handleUpdateProfile = async () => {
  try {
    isLoading.value = true
    // TODO: Implement profile update in auth store
    await auth.updateProfile(form.value)
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update profile:', error)
  } finally {
    isLoading.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  // Reset form to current values
  form.value = {
    username: auth.user?.username || '',
    email: auth.user?.email || '',
    bio: auth.user?.bio || ''
  }
}
</script> 