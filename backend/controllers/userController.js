const jwt = require('jsonwebtoken');

const SECRET = 'your_secret_key';

exports.login = (req, res) => {
    const { username, password } = req.body;
    if(username === 'admin' && password === 'password'){
        const token = jwt.sign({username}, SECRET, { expiresIn: '1h' });
        res.json({code: 200, token, message: '登陆成功'});
    }else{
        res.status(401).json({code: 401, message: '用户名或密码错误'});
    }
}

exports.getUserInfo = (req, res) => {
    res.json({
        code: 200,
        data: {
            username: req.user.username,
        }
    })
}