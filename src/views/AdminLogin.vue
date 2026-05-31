<template>
  <div class="login-page">
    <form class="login-box" @submit.prevent="login">
      <h2>Admin Login</h2>

      <input
        type="email"
        v-model="email"
        placeholder="Email Address"
        required
      />

      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <button type="submit" :disabled="loading">
        <i class="fas fa-right-to-bracket"></i>

        {{ loading ? 'Logging In...' : 'Login' }}
      </button>

      <p class="success" v-if="success">
        {{ success }}
      </p>

      <p class="error" v-if="error">
        {{ error }}
      </p>

      <RouterLink to="/">
        Back to Portfolio
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import api from '../services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const error = ref('')
const success = ref('')

async function login() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    router.push('/admin-dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>