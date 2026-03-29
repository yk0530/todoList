<template>
  <div class="about-container page-container">
    <div class="about-header fade-in">
      <h1>关于项目</h1>
      <p>一个现代化的全栈任务管理应用，采用最新的技术栈构建</p>
    </div>
    
    <div class="about-content">
      <div class="about-card fade-in">
        <h2>项目概述</h2>
        <p>
          这是一个基于 Vue3 + TypeScript + Node.js 的全栈项目，实现了完整的用户认证系统和任务管理功能。
          项目采用现代化的技术栈和最佳实践，旨在提供一个高效、可靠的任务管理解决方案。
        </p>
        <p>
          应用支持用户注册登录、JWT 认证、任务增删改查等核心功能，同时提供了优雅的用户界面和流畅的用户体验。
        </p>
        
        <div class="tech-stack">
          <div class="tech-item">
            <div class="tech-icon">⚡</div>
            <div class="tech-name">Vue 3</div>
            <div class="tech-desc">渐进式 JavaScript 框架</div>
          </div>
          
          <div class="tech-item">
            <div class="tech-icon">📘</div>
            <div class="tech-name">TypeScript</div>
            <div class="tech-desc">类型安全的 JavaScript 超集</div>
          </div>
          
          <div class="tech-item">
            <div class="tech-icon">🚀</div>
            <div class="tech-name">Vite</div>
            <div class="tech-desc">下一代前端构建工具</div>
          </div>
          
          <div class="tech-item">
            <div class="tech-icon">🔗</div>
            <div class="tech-name">Node.js</div>
            <div class="tech-desc">后端 JavaScript 运行时</div>
          </div>
          
          <div class="tech-item">
            <div class="tech-icon">🗄️</div>
            <div class="tech-name">Express</div>
            <div class="tech-desc">Node.js Web 应用框架</div>
          </div>
          
          <div class="tech-item">
            <div class="tech-icon">🍃</div>
            <div class="tech-name">MongoDB</div>
            <div class="tech-desc">NoSQL 数据库</div>
          </div>
        </div>
      </div>
      
      <div class="about-card fade-in">
        <h2>核心功能</h2>
        
        <div class="features">
          <div class="feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="feature-content">
              <h3>用户认证</h3>
              <p>基于 JWT 的安全认证系统，支持用户注册、登录、权限控制</p>
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div class="feature-content">
              <h3>任务管理</h3>
              <p>完整的 CRUD 操作，支持任务创建、编辑、删除、标记完成</p>
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div class="feature-content">
              <h3>响应式设计</h3>
              <p>适配各种屏幕尺寸，在手机、平板和桌面设备上都能完美显示</p>
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div class="feature-content">
              <h3>实时反馈</h3>
              <p>丰富的交互反馈和动画效果，提升用户体验</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="about-card fade-in">
        <h2>项目架构</h2>
        
        <div class="architecture">
          <div class="arch-layer">
            <div class="arch-title">前端层</div>
            <div class="arch-tech">Vue 3 + TypeScript + Vite + Pinia + Vue Router</div>
            <div class="arch-desc">现代化的单页应用架构，提供流畅的用户交互体验</div>
          </div>
          
          <div class="arch-arrow">↓</div>
          
          <div class="arch-layer">
            <div class="arch-title">API 层</div>
            <div class="arch-tech">Express + RESTful API + JWT 认证</div>
            <div class="arch-desc">基于 REST 架构的 API 设计，提供安全的数据接口</div>
          </div>
          
          <div class="arch-arrow">↓</div>
          
          <div class="arch-layer">
            <div class="arch-title">数据层</div>
            <div class="arch-tech">MongoDB + Mongoose</div>
            <div class="arch-desc">NoSQL 数据库存储，灵活的数据模型设计</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 关于页面逻辑
</script>

<style scoped>
.about-container {
  padding-bottom: var(--space-2xl);
}

.about-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.about-header h1 {
  margin-bottom: var(--space-sm);
}

.about-header p {
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.about-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--glass-shadow);
  margin-bottom: var(--space-xl);
}

.about-card h2 {
  margin-bottom: var(--space-md);
  color: var(--text-dark);
}

.about-card p {
  margin-bottom: var(--space-md);
  line-height: 1.7;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.tech-item {
  background: var(--bg-secondary);
  border-radius: var(--radius);
  padding: var(--space-md);
  text-align: center;
  transition: transform var(--transition);
  
  &:hover {
    transform: translateY(-4px);
  }
}

.tech-icon {
  font-size: 2rem;
  margin-bottom: var(--space-sm);
  color: var(--primary);
}

.tech-name {
  font-weight: 600;
  margin-bottom: var(--space-xs);
  color: var(--text-dark);
}

.tech-desc {
  font-size: 0.875rem;
  color: var(--text-light);
}

.features {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
}

.feature {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-content h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-xs);
  color: var(--text-dark);
}

.feature-content p {
  margin-bottom: 0;
  color: var(--text);
  font-size: 0.95rem;
}

.architecture {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.arch-layer {
  background: var(--bg-secondary);
  border-radius: var(--radius);
  padding: var(--space-lg);
  border-left: 4px solid var(--primary);
}

.arch-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: var(--space-xs);
}

.arch-tech {
  font-size: 0.95rem;
  color: var(--primary);
  margin-bottom: var(--space-xs);
  font-weight: 500;
}

.arch-desc {
  font-size: 0.875rem;
  color: var(--text-light);
}

.arch-arrow {
  text-align: center;
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: bold;
  margin: var(--space-xs) 0;
}

@media (max-width: 768px) {
  .tech-stack {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .feature {
    flex-direction: column;
    text-align: center;
  }
  
  .feature-icon {
    margin: 0 auto;
  }
  
  .arch-arrow {
    transform: rotate(90deg);
    margin: var(--space-xs) auto;
  }
}

@media (max-width: 480px) {
  .tech-stack {
    grid-template-columns: 1fr;
  }
  
  .about-card {
    padding: var(--space-xl) var(--space-lg);
  }
}
</style>