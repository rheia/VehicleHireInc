import { Kind } from "../shared/kind";

export interface Product {
    id: number;
    kindId: number;
    vehicleModel: string;
    pricePerDay: number;
    kind: Kind;
    [x: string]: any;
}
