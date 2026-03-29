import axios from 'axios';
import router from '@/router/index';

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
})

request.interceptors.request.use(config => {
    // 在发送请求之前，可以在这里添加一些公共的请求头或者进行其他的处理
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
},err => {
    return Promise.reject(err);
})

request.interceptors.response.use(response => {
    // 在接收响应之后，可以在这里进行一些统一的处理，比如错误处理或者数据格式化
    return response.data;
}, error => {
    if(error.response.status === 401){
        localStorage.removeItem('token');
        router.push('/login');
    }
    return Promise.reject(error);
}
)

export default request;