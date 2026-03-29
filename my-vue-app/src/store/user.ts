import { defineStore } from "pinia";
import { getUserInfo } from "@/api/user";

interface UserInfo {
  username: string
  email?: string
  avatar?: string
  createdAt?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),
  
  getters: {
    username: (state) => state.userInfo?.username || '',
    isLoggedIn: (state) => state.isAuthenticated,
  },
  
  actions: {
    async fetchUserInfo() {
      this.loading = true
      this.error = null
      
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('未找到认证令牌')
        }
        
        const res = await getUserInfo()
        this.userInfo = {
          username: res.data.username,
          email: res.data.email,
          createdAt: res.data.createdAt,
        }
        this.isAuthenticated = true
      } catch (err: any) {
        this.error = err.response?.data?.message || '获取用户信息失败'
        this.isAuthenticated = false
        this.userInfo = null
      } finally {
        this.loading = false
      }
    },
    
    setUser(userData: Partial<UserInfo>) {
      this.userInfo = {
        username: userData.username || '',
        email: userData.email,
        avatar: userData.avatar,
        createdAt: userData.createdAt,
      }
      this.isAuthenticated = true
    },
    
    clearUser() {
      this.userInfo = null
      this.isAuthenticated = false
      this.error = null
    },
    
    updateUserInfo(userData: Partial<UserInfo>) {
      if (this.userInfo) {
        this.userInfo = {
          ...this.userInfo,
          ...userData,
        }
      }
    },
  },
  
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
        storage: localStorage,
        paths: ['userInfo', 'isAuthenticated'],
      },
    ],
  },
})