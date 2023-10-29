const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const router = Router()
// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Minimal lenght is 6 charters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректні дані для реєстрації.'
                })
            }
            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Користувач з такою поштою вже зареєстрований...' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Акаунт створено!' })

        } catch (e) {
            res.status(500).json({ message: 'Щось пішло не так, спробуйте знову.' })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильний пароль або пошта.'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Користувача не знайдено..' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неправильний пароль.' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userID: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Щось пішло не так, спробуйте знову.' })
        }
    })

module.exports = router