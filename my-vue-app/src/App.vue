<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showNavbar = computed(() => {
  return route.path !== '/login'
})
</script>

<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
