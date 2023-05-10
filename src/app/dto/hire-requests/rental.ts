export interface Rental {
    id: number,
    rentalDate: Date,
    customerName: string,
    customerPhoneNumber: string,
    kindId: number,
    kind?: Kind,
    rentalItemId?: number,
    returnDate?: Date,
    rentalItem?: RentalItem,
    fuleConsumed?: number,
    damages?: string,
    totalCost?: number,
    kindTypeId: number,
    status?: number,
}

export interface RentalItem {
    id: number,
    name: string,
    rentalRate: number,
    kindId: number,
    kind: Kind,
}

export interface Kind {
    id: number,
    typeId: number,
    name: string
}

export interface CreateRental {
    rentalDate: Date,
    customerName: string,
    customerPhoneNumber: string,
    kindId: number,
    status: number,
    rentalItemId?: number,
}