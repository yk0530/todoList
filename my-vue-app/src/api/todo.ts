import request from "@/utils/request";

export interface TodoItem {
  _id: string
  content: string
  completed: boolean
  createdAt: string
  priority?: 'low' | 'medium' | 'high'
}

export const getTodoList = () => {
  return request.get('/api/todo/list');
}

export const addTodo = (content: string) => {
  return request.post('/api/todo/add', { content });
}

export const updateTodo = (id: string, data: Partial<TodoItem>) => {
  return request.put(`/api/todo/update/${id}`, data);
}

export const deleteTodo = (id: string) => {
  return request.delete(`/api/todo/delete/${id}`);
}