import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User"
import { Request, Response, NextFunction } from "express"
import exp from "constants"


// Register
const register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, country, dateBirth, password } = req.body;
    try {

        const birthDate = Date.parse(dateBirth);
        console.log(dateBirth)
        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            country,
            dateBirth: birthDate
        });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        next(error)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30m' });

        const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ token });
    } catch (error) {
        next(error)
    }

}

const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const refreshToken = cookies.jwt;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { email: string };
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const token = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30m' });

        res.status(200).json({ token });
    } catch (error) {
        next(error)
    }
}


export {
    register,
    login,
    refresh
}


const auth = {

}