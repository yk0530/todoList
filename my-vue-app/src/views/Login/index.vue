<template>
  <div class="login-container">
    <div class="login-card slide-in">
      <div class="login-header">
        <div class="logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="url(#gradient)"/>
            <path d="M16 24L22 30L32 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6366F1"/>
                <stop offset="1" stop-color="#8B5CF6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1>欢迎回来</h1>
        <p>请输入您的凭据以访问您的账户</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="请输入用户名"
            :class="{ 'error': usernameError }"
            @input="clearError('username')"
          />
          <div v-if="usernameError" class="error-message mt-sm">
            {{ usernameError }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="请输入密码"
            :class="{ 'error': passwordError }"
            @input="clearError('password')"
          />
          <div v-if="passwordError" class="error-message mt-sm">
            {{ passwordError }}
          </div>
        </div>
        
        <div class="form-options">
          <label class="checkbox">
            <input type="checkbox" v-model="rememberMe" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        
        <button type="submit" class="btn btn-primary btn-lg w-full" :disabled="loading">
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>登录</span>
        </button>
        
        <div v-if="errorMessage" class="error-message mt-md">
          {{ errorMessage }}
        </div>
        
        <div class="login-footer">
          <p>还没有账户？ <a href="#" class="register-link">立即注册</a></p>
        </div>
      </form>
    </div>
    
    <div class="login-background">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const errors = reactive({
  username: '',
  password: ''
})

const errorMessage = ref('')

const usernameError = ref('')
const passwordError = ref('')

const validateForm = () => {
  let isValid = true
  
  if (!username.value.trim()) {
    usernameError.value = '用户名不能为空'
    isValid = false
  }
  
  if (!password.value) {
    passwordError.value = '密码不能为空'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = '密码至少需要6个字符'
    isValid = false
  }
  
  return isValid
}

const clearError = (field: string) => {
  if (field === 'username') {
    usernameError.value = ''
  } else if (field === 'password') {
    passwordError.value = ''
  }
  errorMessage.value = ''
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const res = await request.post('/api/user/login', {
      username: username.value,
      password: password.value
    })
    
    localStorage.setItem('token', res.token)
    
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
      localStorage.setItem('username', username.value)
    } else {
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('username')
    }
    
    userStore.setUser({ username: username.value })
    
    router.push('/home')
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || '登录失败，请检查用户名和密码'
  } finally {
    loading.value = false
  }
}

const loadRememberedUser = () => {
  const remembered = localStorage.getItem('rememberMe')
  if (remembered === 'true') {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      username.value = savedUsername
      rememberMe.value = true
    }
  }
}

loadRememberedUser()
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  position: relative;
  overflow: hidden;
}

.login-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  width: 100%;
  max-width: 440px;
  box-shadow: var(--glass-shadow);
  z-index: 10;
  position: relative;
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.login-header .logo {
  margin-bottom: var(--space-lg);
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-header p {
  color: var(--text-light);
  font-size: 0.95rem;
}

.login-form {
  margin-bottom: var(--space-lg);
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: 500;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.form-group input.error {
  border-color: var(--danger);
  background: rgba(239, 68, 68, 0.05);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  font-size: 0.9rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
}

.checkbox input {
  width: auto;
  margin: 0;
}

.checkbox span {
  color: var(--text);
}

.forgot-password {
  color: var(--primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.forgot-password:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.login-footer {
  text-align: center;
  margin-top: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
  color: var(--text-light);
}

.register-link {
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.register-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-primary);
  opacity: 0.1;
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: -80px;
  background: var(--gradient-success);
  animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 10%;
  background: var(--gradient-warning);
  animation: float 25s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(20px) rotate(240deg);
  }
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: var(--space-xs);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .login-card {
    padding: var(--space-xl) var(--space-lg);
  }
  
  .login-header h1 {
    font-size: 1.75rem;
  }
}
</style>