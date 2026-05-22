import AuthService from "../services/authServices.js";
import { Request, Response } from "express";

class AuthController {
    static signup = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json("Give required fields!");
            }
            const existingUser = await AuthService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists!" })
            }
            const user = await AuthService.registerUser(username, email, password);
            return res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: "Registration failed!", error });

        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json("Give required fields!");
            }
            
            const data = await AuthService.loginUser(email, password);
            return res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: "Login failed!", error });

        }



    }
};

export default AuthController;