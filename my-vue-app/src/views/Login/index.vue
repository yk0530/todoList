<template>
  <div class="wrapper">
    <h1>Login</h1>
    <div class="user">
        <input v-model="username" placeholder="用户名"/>
    </div>
    <div class="password">
         <input v-model="password" type="password" placeholder="密码"/>
    </div>
   
    <button @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'

const router = useRouter()

let username = ref('')
let password = ref('')

let login = async() => {
    if(!username.value || !password.value){
        alert('请输入用户名和密码')
        return
    }
    try{
        let res = await request.post('/api/user/login',{
            username: username.value,
            password: password.value
        })
        localStorage.setItem('token', res.token)
        router.push('/home')
    }catch(err){
        alert('登录失败')
    }
    
}
</script>

<style>

</style>