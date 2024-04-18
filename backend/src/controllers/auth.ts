import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User"
import {Request, Response, NextFunction} from "express"
import exp from "constants"


// Register
const register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, country, address, dateBirth } = req.body;
    try {

        const birthDate = Date.parse(dateBirth);
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            country,
            address,
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
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY!, {expiresIn: '1h'});
        console.log(process.env.SECRET_KEY!)
        res.status(200).json({ token }); 
    } catch (error) {
        next(error)
    }

}

export {
    register,
    login
}