import express from 'express';
const router = express.Router();//路由模块

// 登录接口
router.post('/login', (req, res) => {
    // 向客户端发送响应，返回登录成功信息
    res.send({
        code: 200,
        msg: '登录成功',
        data: {
            user: req.body.user,
            pwd: req.body.pwd,
            // 登录成功后，将用户信息存储到session中
            session: 'session'
        }
    })
})
// 注册接口
router.post('/register', (req, res) => {
    // 向客户端发送响应，返回注册成功信息
    res.send({
        code: 200,
        msg: '注册成功',
        data: {
            user: req.body.user,
            pwd: req.body.pwd
        }
    })
})

export default router;