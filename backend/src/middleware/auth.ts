import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //const token = req.cookies.token;

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        console.log(decoded)
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.body.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authenticate;