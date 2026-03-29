<template>
  <div class="todo-container page-container">
    <div class="todo-header fade-in">
      <h1>任务管理</h1>
      <p>管理您的日常任务，保持高效工作</p>
    </div>
    
    <div class="todo-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ completedCount }}</div>
          <div class="stat-label">已完成</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ pendingCount }}</div>
          <div class="stat-label">进行中</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ totalCount }}</div>
          <div class="stat-label">总任务</div>
        </div>
      </div>
    </div>
    
    <div class="todo-form card fade-in">
      <h3>添加新任务</h3>
      <div class="form-row">
        <input 
          v-model="content" 
          placeholder="请输入任务内容..."
          @keyup.enter="handleAdd"
          :disabled="loading"
        />
        <button 
          @click="handleAdd" 
          class="btn btn-primary"
          :disabled="loading || !content.trim()"
        >
          <span v-if="loading">添加中...</span>
          <span v-else>添加任务</span>
        </button>
      </div>
    </div>
    
    <div class="todo-list">
      <div v-if="loading && list.length === 0" class="loading">
        <div class="loading-spinner"></div>
        <p>加载任务中...</p>
      </div>
      
      <div v-else-if="list.length === 0" class="todo-empty">
        <div class="empty-icon">📝</div>
        <h3>暂无任务</h3>
        <p>开始添加您的第一个任务吧！</p>
      </div>
      
      <div v-else>
        <div class="todo-list-header">
          <h3>任务列表</h3>
          <div class="list-actions">
            <button 
              @click="toggleFilter" 
              class="btn btn-sm btn-secondary"
            >
              {{ showCompletedOnly ? '显示全部' : '仅显示已完成' }}
            </button>
          </div>
        </div>
        
        <div class="todo-items">
          <div 
            v-for="item in filteredList" 
            :key="item._id" 
            class="todo-item card fade-in"
            :class="{ 'completed': item.completed }"
          >
            <div 
              class="todo-checkbox" 
              :class="{ 'completed': item.completed }"
              @click="toggleTodo(item)"
            >
              <span v-if="item.completed">✓</span>
            </div>
            
            <div class="todo-content">
              <div 
                class="todo-text" 
                :class="{ 'completed': item.completed }"
                @dblclick="startEdit(item)"
              >
                <span v-if="!item.editing">{{ item.content }}</span>
                <input 
                  v-else
                  v-model="item.editContent"
                  @blur="saveEdit(item)"
                  @keyup.enter="saveEdit(item)"
                  @keyup.escape="cancelEdit(item)"
                  class="edit-input"
                  autofocus
                />
              </div>
              
              <div class="todo-meta">
                <span class="todo-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {{ formatDate(item.createdAt) }}
                </span>
                
                <span class="todo-priority" :class="`priority-${item.priority || 'medium'}`">
                  {{ getPriorityLabel(item.priority) }}
                </span>
              </div>
            </div>
            
            <div class="todo-actions">
              <button 
                @click="toggleTodo(item)" 
                class="btn btn-sm btn-success"
                :title="item.completed ? '标记为未完成' : '标记为完成'"
              >
                {{ item.completed ? '撤销完成' : '完成' }}
              </button>
              <button 
                @click="handleDelete(item._id)" 
                class="btn btn-sm btn-danger"
                :disabled="deletingId === item._id"
              >
                <span v-if="deletingId === item._id">删除中...</span>
                <span v-else>删除</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="errorMessage" class="error-message mt-lg">
      {{ errorMessage }}
    </div>
    
    <div v-if="successMessage" class="success-message mt-lg">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getTodoList, addTodo, deleteTodo, updateTodo } from '@/api/todo'

interface TodoItem {
  _id: string
  content: string
  completed: boolean
  createdAt: string
  priority?: 'low' | 'medium' | 'high'
  editing?: boolean
  editContent?: string
}

const list = ref<TodoItem[]>([])
const content = ref<string>('')
const loading = ref(false)
const deletingId = ref<string | null>(null)
const errorMessage = ref('')
const successMessage = ref('')
const showCompletedOnly = ref(false)

const fetchList = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const res = await getTodoList()
    list.value = res.data.map((item: any) => ({
      ...item,
      editing: false,
      editContent: item.content
    }))
  } catch (err) {
    errorMessage.value = '获取任务列表失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleAdd = async () => {
  if (!content.value.trim()) {
    errorMessage.value = '请输入任务内容'
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    await addTodo(content.value)
    content.value = ''
    successMessage.value = '任务添加成功'
    await fetchList()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    errorMessage.value = '添加任务失败'
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('确定要删除这个任务吗？')) {
    return
  }
  
  deletingId.value = id
  
  try {
    await deleteTodo(id)
    successMessage.value = '任务删除成功'
    await fetchList()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    errorMessage.value = '删除任务失败'
  } finally {
    deletingId.value = null
  }
}

const toggleTodo = async (item: TodoItem) => {
  try {
    const updatedTodo = { ...item, completed: !item.completed }
    await updateTodo(item._id, updatedTodo)
    item.completed = !item.completed
  } catch (err) {
    errorMessage.value = '更新任务状态失败'
  }
}

const startEdit = (item: TodoItem) => {
  item.editing = true
  item.editContent = item.content
}

const saveEdit = async (item: TodoItem) => {
  if (!item.editContent?.trim()) {
    errorMessage.value = '任务内容不能为空'
    item.editing = false
    return
  }
  
  try {
    const updatedTodo = { ...item, content: item.editContent }
    await updateTodo(item._id, updatedTodo)
    item.content = item.editContent
    item.editing = false
    successMessage.value = '任务更新成功'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    errorMessage.value = '更新任务失败'
  }
}

const cancelEdit = (item: TodoItem) => {
  item.editing = false
  item.editContent = item.content
}

const toggleFilter = () => {
  showCompletedOnly.value = !showCompletedOnly.value
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}

const getPriorityLabel = (priority?: string) => {
  const labels: Record<string, string> = {
    low: '低优先级',
    medium: '中优先级',
    high: '高优先级'
  }
  return labels[priority || 'medium'] || '中优先级'
}

const completedCount = computed(() => {
  return list.value.filter(item => item.completed).length
})

const pendingCount = computed(() => {
  return list.value.filter(item => !item.completed).length
})

const totalCount = computed(() => {
  return list.value.length
})

const filteredList = computed(() => {
  if (showCompletedOnly.value) {
    return list.value.filter(item => item.completed)
  }
  return list.value
})

onMounted(() => {
  fetchList()
})
</script>

<style scoped>
.todo-container {
  padding-bottom: var(--space-2xl);
}

.todo-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.todo-header h1 {
  margin-bottom: var(--space-sm);
}

.todo-header p {
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.todo-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.stat-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  transition: transform var(--transition);
  
  &:hover {
    transform: translateY(-4px);
  }
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1;
  margin-bottom: var(--space-xs);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
}

.todo-form {
  margin-bottom: var(--space-xl);
}

.todo-form h3 {
  margin-bottom: var(--space-md);
}

.form-row {
  display: flex;
  gap: var(--space-sm);
}

.form-row input {
  flex: 1;
}

.todo-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.todo-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.todo-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  transition: all var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &.completed {
    opacity: 0.8;
    
    .todo-content {
      opacity: 0.7;
    }
  }
}

.todo-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  flex-shrink: 0;
  
  &:hover {
    border-color: var(--primary);
  }
  
  &.completed {
    background: var(--gradient-success);
    border-color: transparent;
    
    span {
      color: white;
      font-weight: bold;
      font-size: 0.875rem;
    }
  }
}

.todo-content {
  flex: 1;
  min-width: 0;
}

.todo-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: var(--space-xs);
  transition: color var(--transition-fast);
  cursor: pointer;
  
  &.completed {
    color: var(--text-light);
    text-decoration: line-through;
  }
  
  .edit-input {
    font-size: 1.125rem;
    font-weight: 500;
    padding: var(--space-xs) var(--space-sm);
    margin: calc(var(--space-xs) * -1) calc(var(--space-sm) * -1);
  }
}

.todo-meta {
  display: flex;
  gap: var(--space-md);
  font-size: 0.875rem;
  color: var(--text-light);
}

.todo-date {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.todo-priority {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
}

.priority-low {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.priority-medium {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.priority-high {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
}

.todo-actions {
  display: flex;
  gap: var(--space-xs);
  flex-shrink: 0;
}

.todo-empty {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--text-light);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--space-md);
  opacity: 0.5;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  color: var(--text-light);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-md);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .todo-stats {
    grid-template-columns: 1fr;
  }
  
  .todo-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }
  
  .todo-actions {
    align-self: flex-end;
  }
  
  .form-row {
    flex-direction: column;
  }
}
</style>