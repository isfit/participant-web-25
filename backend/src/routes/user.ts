import express from 'express';
import authenticate from '../middleware/auth';

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
    res.json({message: `Welcom ${req.body.user.firstName} ${req.body.user.lastName}`})
});

export default router