import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from '../config/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
    static registerUser = async (
        username: string,
        email: string,
        password: string
    ) => {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            },
        });

        return user;
    };

    static findUserByEmail = async (email: string) => {
        return prisma.user.findUnique({ where: { email } });
    };

    static loginUser = async (
        email: string,
        password: string
    ) => {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new Error("User not found!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid password!');
        }

        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                JWT_SECRET!,
                { expiresIn: "1h" }
            );
        } catch (error) {
            throw new Error("Error! Something went wrong.");

        }

        const data = {
                    userId: user.id,
                    email: user.email,
                    token: token,
                }
        return data;
    };

    static findUserById = async (id: number) => {
        return prisma.user.findUnique({ where: { id } });
    };
}

export default AuthService;