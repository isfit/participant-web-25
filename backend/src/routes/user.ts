import express from 'express';
import authenticate from '../middleware/auth';

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.body.user.firstName} ${req.body.user.lastName}` })
});

router.get("/refresh")

router.get("/logout")

export default router