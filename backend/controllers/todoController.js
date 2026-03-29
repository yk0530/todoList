const Todo = require('../models/Todo')
let id = 2

exports.getList = async (req,res) => {
    const list = await Todo.find()
    res.json({
        code: 200,
        data: list,
    })
}

exports.addTodo = async (req,res) => {
    const {content} = req.body
    if(!content){
        return res.status(400).json({
            code: 400,
            message: '内容不能为空'
        })
    }
    const newTodo = await Todo.create({
        content,
        done: false,
    })
    res.json({
        code: 200,
        data: newTodo,
    })
}

exports.deleteTodo = async (req,res) => {
    const todoId = req.params.id
    await Todo.findByIdAndDelete(todoId)
    res.json({
        code: 200,
        message: '删除成功',
    })
}