import { Coordinates } from "./Terminal";

export type Hotel = {
    code: string;
    name: string;
    category: string;
    description?: string;
    countryCode: string;
    destinationCode: string;
    city: string;
    coordinates: Coordinates;
    address: string;
    postalCode?: string;
}
