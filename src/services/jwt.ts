import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../types/user";

const createToken = (user: User) => {
    try {
        const userToToken = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            id: user.id
        }
        return jwt.sign(userToToken, config.SECRET_KEY, {
            expiresIn: config.EXPIRATION_TIME,
        });
    } catch (err) {
        throw Error("Must set a SECRET_KET as env");
    }
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, config.SECRET_KEY);
    } catch (err) {
        return null;
    }
};

const createEmptyToken = () => {
    try { return jwt.sign({}, config.SECRET_KEY, { expiresIn: 0 }) } catch (err) {
        throw Error("Must set a SECRET_KET as env");
    }
}

export { createToken, verifyToken, createEmptyToken };