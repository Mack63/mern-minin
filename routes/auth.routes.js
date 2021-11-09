const {Router} = require('express')
const bcrypt = require('bcryptjs')
const  User = require('../models/User')
const {check, validationResult} = require('express-validator')
const  jwt = require('jsonwebtoken')
const config = require('config')

// '/api/auth'
const router = new Router()
router.post('/registration',
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res)=>{
        //console.log('Body: ',req.body)
    try {
        const errorsValid = validationResult(req)
        if (!errorsValid.isEmpty()){
            return res.status(400).json({
                errors: errorsValid.array(),
                message: "Не корректные данные при регистрации!!!!"
            })
        }
        const {email, password} = req.body

        const user_reg = await User.findOne({email})
        if (user_reg){
            return res.status(400).json({
                message: "Такой пользователь уже существует !!!"
            })
        }
        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPass})
        await user.save()
        return res.status(201).json({message: "Пользоватедь создан !!!"})

    }catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
})

// login
router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res)=>{
        try {
            const errorsValid = validationResult(req)
            if (!errorsValid.isEmpty()){
                res.status(400).json({
                    errors: errorsValid.array(),
                    message: "Не корректные данные при входе!!!!"
                })}
            const {email, password} = req.body
            const user_reg = await User.findOne({email})
            if (!user_reg){
                res.status(400).json({
                    message: "Такой пользователь не найден !!!!"
                })
            }
            const isMatch = await bcrypt.compare(password, user_reg.password)
            if (!isMatch){
                res.status(400).json({
                    message: "Не верный пароль !!!!"
                })
            }
            const token = jwt.sign(
                {userId: user_reg.id},
                config.get('secretekey'),
                {expiresIn: '1h'}
            )
            res.status(201).json({token, userId: user_reg.id, message: "Вход выполнен"})

        }catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    })
module.exports = router