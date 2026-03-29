const express = require('express')
const router = express.Router()
const {
    getList,
    addTodo,
    deleteTodo,
} = require('../controllers/todoController')
const auth = require('../middleware/auth')

router.use(auth)

router.get('/list', getList)
router.post('/add', addTodo)
router.delete('/delete/:id', deleteTodo)

module.exports = router