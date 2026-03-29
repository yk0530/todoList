const jwt = require('jsonwebtoken');
const SECRET = 'your_secret_key';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message: '未登录'
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: 'token无效'
    })
    }
}