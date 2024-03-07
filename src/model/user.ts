import { hashPassword } from "../services/bcrypt";
import { Booking } from "../types/transferConfirmation";
import { User } from "../types/user";
import uniqueId from "short-unique-id"

const users: User[] = [];



export const createUser = async (user: User) => {
    user.password = await hashPassword(user.password);
    const { randomUUID } = new uniqueId({ length: 20 })
    user.id = randomUUID();
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            const index1 = users.findIndex(usr => user.email === usr.email);
            if (index1 >= 0) reject("Email already used");
            const index = users.findIndex(usr => user.phone === usr.phone);
            if (index >= 0) reject("Phone already used");

            users.push(user);
            console.log(JSON.stringify(users, null, 4))
            resolve("ok")
        }, 2000);
    })
}

export const getUserByEmail = (email: string) => {
    return new Promise<User>((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex(usr => email === usr.email);
            if (index < 0) reject("Invalid data")
            resolve(users[index])
        }, 2000);
    })
}

export const addTransferToUser = (userId: string, transferToAdd: Booking) => {
    return new Promise<User>((resolve, reject) => {

        const index = users.findIndex(usr => userId === usr.id);
        if (index < 0) reject("Invalid data")
        users[index].transfersLog.push(transferToAdd);
        resolve(users[index])

    })
}

export const cancelTransferAtUser = (userId: string, bookingReference: string) => {
    const index = users.findIndex(usr => userId === usr.id);
    if (index < 0) return ("Invalid data")

    const brIndex = users[index].transfersLog.findIndex(transfer => transfer.reference === bookingReference);
    if (brIndex < 0) return ("Invalid booking reference");

    users[index].transfersLog[brIndex].status = "CANCELLED";
    return users[index]

}
