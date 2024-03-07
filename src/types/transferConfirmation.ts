export type TransferConfirmation = {
    bookings: Booking[];
}

export type Booking = {
    reference: string;
    bookingFileId: null;
    creationDate: Date;
    status: string;
    modificationsPolicies: ModificationsPolicies;
    holder: Holder;
    transfers: Transfer[];
    clientReference: string;
    remark: string;
    invoiceCompany: InvoiceCompany;
    supplier: Supplier;
    totalAmount: number;
    totalNetAmount: number;
    pendingAmount: number;
    currency: string;
    links: Link[];
    paymentDataRequired: boolean;
}

export type Holder = {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export type InvoiceCompany = {
    code: string;
}

export type Link = {
    rel: string;
    href: string;
    method: string;
}

export type ModificationsPolicies = {
    cancellation: boolean;
    modification: boolean;
}

export type Supplier = {
    name: string;
    vatNumber: string;
}

export type Transfer = {
    id: number;
    rateKey: string;
    status: string;
    transferType: string;
    vehicle: Category;
    category: Category;
    pickupInformation: PickupInformation;
    paxes: Pax[];
    content: Content;
    price: Price;
    cancellationPolicies: CancellationPolicy[];
    factsheetId: null;
    arrivalFlightNumber: string;
    departureFlightNumber: null;
    arrivalShipName: null;
    departureShipName: null;
    arrivalTrainInfo: null;
    departureTrainInfo: null;
    transferDetails: TransferDetail[];
    sourceMarketEmergencyNumber: string;
    links: Link[];
}

export type CancellationPolicy = {
    amount: number;
    from: Date;
    currencyId: string;
    isForceMajeure: boolean;
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
    customerTransferTimeInfo: any[];
    supplierTransferTimeInfo: any[];
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

export type Pax = {
    type: string;
    age: number;
}

export type PickupInformation = {
    from: From;
    to: From;
    date: Date;
    time: string;
    pickup: Pickup;
}

export type From = {
    code: string;
    description: string;
    type: string;
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
    url: string;
    hoursBeforeConsulting: null;
}

export type Price = {
    totalAmount: number;
    netAmount: number;
    currencyId: string;
}

export type TransferDetail = {
    type: string;
    direction: string;
    code: string;
    companyName: null;
}
