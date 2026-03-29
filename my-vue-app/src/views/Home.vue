<template>
    <div>
        <h2>Todo List</h2>
        <input v-model="content" placeholder="请输入任务" />
        <button @click="handleAdd">添加</button>
        <ul>
            <li v-for="item in list" :key="item._id">
                {{ item.content }}
                <button @click="handleDelete(item._id)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/user'
import axios from 'axios';
import {getTodoList,addTodo,deleteTodo} from '@/api/todo'

const list = ref<any[]>([])
const content = ref<string>('')

const fetchList = async () => {
    try{
        const res = await getTodoList()
        list.value = res.data
    }catch(err){
        alert('获取列表失败')
    }
}

const handleAdd = async () => {
    if(!content.value){
        alert('请输入任务内容')
        return
    }
    try{
        await addTodo(content.value)
        content.value = ''
        fetchList()
    }catch(err){
        alert('添加任务失败')
    }
}

const handleDelete = async (id: string) => {
    try {
        await deleteTodo(id)
        fetchList()
    } catch (err) {
        alert('删除任务失败')
    }
}

onMounted(() => {
    fetchList()
})

</script>

<style>

</style>