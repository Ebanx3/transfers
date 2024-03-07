export type Available = {
    search: Search;
    services: Service[];
}

export type Search = {
    language: string;
    departure: ComeBack;
    comeBack: ComeBack;
    occupancy: Occupancy;
    from: From;
    to: From;
}

export type ComeBack = {
    date: string;
    time: string;
}

export type From = {
    code: string;
    description: string;
    type: string;
}

export type Occupancy = {
    adults: number;
    children: number;
    infants: number;
}

export type Service = {
    id: number;
    direction: string;
    transferType: string;
    vehicle: Category;
    category: Category;
    pickupInformation: PickupInformation;
    minPaxCapacity: number;
    maxPaxCapacity: number;
    content: Content;
    price: Price;
    rateKey: string;
    cancellationPolicies: CancellationPolicy[];
    links: Link[];
    factsheetId: number;
}

export type CancellationPolicy = {
    amount: number;
    from: Date;
    currencyId: string;
    isForceMajeure: null;
}

export type Category = {
    code: string;
    name: string;
}

export type Content = {
    vehicle: Category;
    category: Category;
    images: Image[];
    transferDetailInfo: TransferDetailInfo[];
    customerTransferTimeInfo: [];
    supplierTransferTimeInfo: [];
    transferRemarks: TransferRemark[];
}

export type Image = {
    url: string;
    type: string;
}

export type TransferDetailInfo = {
    id: string;
    name: string;
    description: string;
    type: string;
}

export type TransferRemark = {
    type: string;
    description: string;
    mandatory: boolean;
}

export type Link = {
    rel: string;
    href: string;
    method: string;
}

export type PickupInformation = {
    from: From;
    to: From;
    date: Date;
    time: string;
    pickup: Pickup;
}

export type Pickup = {
    address: null;
    number: null;
    town: null;
    zip: null;
    description: string;
    altitude: null;
    latitude: number;
    longitude: number;
    checkPickup: CheckPickup;
    pickupId: null;
    stopName: null;
    image: null;
}

export type CheckPickup = {
    mustCheckPickupTime: boolean;
    url: null;
    hoursBeforeConsulting: null;
}

export type Price = {
    totalAmount: number;
    netAmount: number;
    currencyId: string;
}