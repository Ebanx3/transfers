import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
    return await hash(password, 10)
}

export const comparePasswords = async (receivedPassword: string, hashedPassword: string) => {
    return await compare(receivedPassword, hashedPassword);
}