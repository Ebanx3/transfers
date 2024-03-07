export type Terminal = {
    code: string;
    content: Content;
    countryCode: string;
    coordinates: Coordinates;
    language: string;
}

type Content = {
    type: string;
    description: string;
}

export type Coordinates = {
    latitude: number | null;
    longitude: number | null;
}
