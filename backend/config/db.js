const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo-app')

const db = mongoose.connection;

db.on('open', ()=>{
    console.log('数据库连接成功')
})

db.on('error', (err)=>{
    console.error('数据库连接失败', err)
})

module.exports = db;