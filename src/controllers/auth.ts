import { Request, Response } from "express";
import { ServerResponse } from "../types/ServerResponse";
import { createUser, getUserByEmail } from "../model/user";
import { LoginSchema, RegisterSchema } from "../services/zodSchemas";
import { User } from "../types/user";
import { comparePasswords } from "../services/bcrypt";
import { createEmptyToken, createToken } from "../services/jwt";

export const register = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const result = await RegisterSchema.safeParseAsync(req.body);

        if (!result.success) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid body",
                    data: result.error.issues,
                });
        }

        createUser({ ...result.data, transfersLog: [], id: "" })
            .then(() =>
                res.status(201).json({
                    success: true,
                    message: "User created successfully",
                })
            )
            .catch((data) => {
                return res.status(404).json({
                    success: false,
                    message: data,
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const login = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const result = await LoginSchema.safeParseAsync(req.body);

        if (!result.success) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid body",
                    data: result.error.issues,
                });
        }

        getUserByEmail(result.data.email)
            .then(async (user: User) => {
                const { name, surname, email, password, phone, id, transfersLog } = user;
                const samePass = await comparePasswords(result.data.password, password);
                if (!samePass) {
                    return res
                        .status(400)
                        .json({ success: false, message: "Invalid data" });
                }
                const formatUserToSend = { name, surname, email, phone, id, transfersLog };
                const token = createToken(user);
                res.cookie("jwtTransfer", token, { httpOnly: true, sameSite: "lax" });
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "Correct login",
                        data: formatUserToSend,
                    });
            })
            .catch((message: string) => {
                return res.status(400).json({ success: false, message });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const logout = async (req: Request, res: Response<ServerResponse>) => {
    try {

        const token = createEmptyToken();
        res.cookie("jwtTransfer", token, { httpOnly: true, sameSite: "lax", expires: new Date() });
        return res
            .status(200)
            .json({
                success: true,
                message: "Correct logout",
            });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
