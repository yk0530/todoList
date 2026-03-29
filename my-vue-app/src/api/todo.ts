import request from "@/utils/request";

export const getTodoList = () => {
    return request.get('/api/todo/list');
}

export const addTodo = (content: string) => {
    return request.post('/api/todo/add', {content});
}

export const deleteTodo = (id: string) => {
    return request.delete(`/api/todo/delete/${id}`);
}