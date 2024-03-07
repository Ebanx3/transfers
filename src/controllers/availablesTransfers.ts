import { Request, Response } from "express";
import { ServerResponse } from "../types/ServerResponse";
import axios from "axios";
import {
    avialablesSchema,
    confirmTransferSchema,
} from "../services/zodSchemas";
import config from "../config";
import { Available } from "../types/transfersAvailables";
import { TransferConfirmation } from "../types/transferConfirmation";
import { addTransferToUser, cancelTransferAtUser } from "../model/user";

//fake Data
import fakeDataAV from "../fakeDataAV.json";
import fakeDataConf from "../fakeDataConf.json";

export const getAvailables = async (
    req: Request,
    res: Response<ServerResponse>
) => {
    try {
        const result = await avialablesSchema.safeParseAsync(req.body);

        if (!result.success) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid body",
                    data: result.error.issues,
                });
        }
        const {
            fromType,
            fromCode,
            toType,
            toCode,
            outbound,
            inbound,
            adults,
            children,
            infants,
        } = result.data;

        let hb_endpoint_url = `${config.HOTELBEDS_API_URI}/availability/en/from/${fromType}/${fromCode}/to/${toType}/${toCode}/${outbound}:00/`;
        if (inbound) hb_endpoint_url += `${inbound}:00/`;
        hb_endpoint_url += `${adults}/${children}/${infants}`;

        const { data }: { data: Available[] } = await axios.get(hb_endpoint_url, {
            headers: { "Api-key": config.HOTELBEDS_API_KEY || "" },
        });
        return res
            .status(200)
            .json({ success: true, message: "ok", data: data ?? undefined });

        // return res.status(200).json({ success: true, message: "ok", data: fakeDataAV })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const confirmTransfer = async (
    req: Request,
    res: Response<ServerResponse>
) => {
    try {
        const result = await confirmTransferSchema.safeParseAsync(req.body);

        if (!result.success) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid body",
                    data: result.error.issues,
                });
        }

        const { name, phone, surname, email, id } = req.user!;

        const dataToSend = {
            ...result.data,
            holder: { name, phone, surname, email },
            welcomeMessage: `Welcome Mr. ${name} ${surname}`,
            clientReference: id,
        };

        const { data }: { data: TransferConfirmation } = await axios({
            method: "post",
            url: `${config.HOTELBEDS_API_URI}/bookings`,
            headers: {
                "Api-key": config.HOTELBEDS_API_KEY,
                "Content-Type": "application/json",
            },
            data: dataToSend,
        });

        const response = await addTransferToUser(id, data.bookings[0]);
        return res
            .status(200)
            .json({ success: true, message: "ok", data: { user: response, booking: data } });


        // const response = await addTransferToUser(id, fakeDataConf.bookings[0]);
        // return res.status(200).json({ success: true, message: "ok", data: { user: response, booking: { status: fakeDataConf.bookings[0].status, reference: fakeDataConf.bookings[0].reference } } })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const cancelTransfer = async (
    req: Request,
    res: Response<ServerResponse>
) => {
    try {
        const { bookingReference } = req.params;
        const { id } = req.user!;

        const { data }: { data: TransferConfirmation } = await axios({
            method: "delete",
            url: `${config.HOTELBEDS_API_URI}/bookings/en/${bookingReference}`,
            headers: {
                "Api-key": config.HOTELBEDS_API_KEY,
                "Content-Type": "application/json",
            }
        });

        const response = cancelTransferAtUser(id, data.bookings[0].reference);
        return res
            .status(200)
            .json({ success: true, message: "ok", data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
