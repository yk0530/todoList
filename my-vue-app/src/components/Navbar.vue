<template>
  <nav class="navbar">
    <div class="navbar-container container">
      <router-link to="/home" class="navbar-brand">
        Todo<span>App</span>
      </router-link>
      
      <div class="navbar-menu">
        <router-link 
          to="/home" 
          :class="{ active: $route.path === '/home' }"
          class="fade-in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden-mobile">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          首页
        </router-link>
        <router-link 
          to="/about" 
          :class="{ active: $route.path === '/about' }"
          class="fade-in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden-mobile">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          关于
        </router-link>
      </div>
      
      <div class="navbar-user" v-if="isAuthenticated">
        <div class="user-avatar">
          {{ userInitial }}
        </div>
        <span class="hidden-mobile">{{ username }}</span>
        <button @click="handleLogout" class="btn btn-sm btn-secondary">
          退出
        </button>
      </div>
      <div class="navbar-user" v-else>
        <router-link to="/login" class="btn btn-sm btn-primary">
          登录
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token')
})

const username = computed(() => {
  return userStore.username || '用户'
})

const userInitial = computed(() => {
  return username.value.charAt(0).toUpperCase()
})

const handleLogout = () => {
  localStorage.removeItem('token')
  userStore.clearUser()
  router.push('/login')
}
</script>

<style scoped>
.navbar-user {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}
</style>