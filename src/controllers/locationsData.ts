import config from "../config";
import { Request, Response } from "express";
import axios from "axios";
import { ServerResponse } from "../types/ServerResponse";
import { Destination } from "../types/Destination";
import { Terminal } from "../types/Terminal";
import { Hotel } from "../types/Hotel";

export const verifyCountry = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const { country } = req.params;
        const { data }: { data: { code: string, name: string }[] } = await axios.get(`${config.HOTELBEDS_CACHE_API_URI}/locations/countries?fields=ALL&language=en`, { headers: { "Api-key": config.HOTELBEDS_API_KEY || "" } })

        const index = data.findIndex(dest => dest.name.toLowerCase() === country.toLowerCase())

        if (index < 0) {
            return res.status(400).json({ success: false, message: "Does not exists a country with that name" })
        }

        const { data: destinations }: { data: Destination[] } = await axios.get(`${config.HOTELBEDS_CACHE_API_URI}/locations/destinations?fields=ALL&language=en&countryCodes=${data[index].code}`, { headers: { "Api-key": config.HOTELBEDS_API_KEY || "" } })
        return res.status(200).json({ success: true, message: "Exists a country", data: { countryData: data[index], destinations } })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, message: "Server Error"
        })
    }
}

export const getHotelsAndTerminals = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const { cityCode } = req.params;

        const { data: terminals }: { data: Terminal[] } = await axios.get(`${config.HOTELBEDS_CACHE_API_URI}/locations/terminals?fields=ALL&language=en&codes=${cityCode.toUpperCase()}`, { headers: { "Api-key": config.HOTELBEDS_API_KEY || "" } })
        const { data: hotels }: { data: Hotel[] } = await axios.get(`${config.HOTELBEDS_CACHE_API_URI}/hotels?fields=ALL&language=en&destinationCodes=${cityCode.toUpperCase()}`, { headers: { "Api-key": config.HOTELBEDS_API_KEY || "" } })

        return res.status(200).json({ success: true, message: "Successfully", data: { terminals: terminals.length > 0 ? terminals : [], hotels: hotels.length > 0 ? hotels : [] } })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, message: "Server Error"
        })
    }
}