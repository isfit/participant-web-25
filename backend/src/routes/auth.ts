import { type Request, type Response, Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import { register, login, refresh } from '../controllers/auth'

export

    const router = Router()


router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)


export default router