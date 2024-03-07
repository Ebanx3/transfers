import { Booking } from "./transferConfirmation";

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}



export type User = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    id: string
    transfersLog: Booking[]
}