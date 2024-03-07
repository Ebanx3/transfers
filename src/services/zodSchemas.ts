import { z } from "zod";

export const avialablesSchema = z.object({
    fromType: z.string(),
    fromCode: z.string(),
    toType: z.string(),
    toCode: z.string(),
    outbound: z.string(),
    inbound: z.string().optional(),
    adults: z.number().min(1),
    children: z.number().min(0),
    infants: z.number().min(0),
});

export const RegisterSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    phone: z.string().refine((value) => /^\+\d+$/.test(value), {
        message: 'The phone number must start with "+" followed by numbers',
    }),
    password: z.string().min(8),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const transferDetailsSchema = z.object({
    type: z.string(),
    direction: z.string(),
    code: z.string(),
    companyName: z.string().nullable()
})

const transferSChema = z.object({
    rateKey: z.string(),
    transferDetails: z.array(transferDetailsSchema)
})

export const confirmTransferSchema = z.object({
    language: z.string(),
    transfers: z.array(transferSChema),
    remark: z.string()
});
