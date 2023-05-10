import { Kind } from "../shared/kind";
import { Product } from "./product";

export interface Vehicle extends Product {
    id: number;
    kindId: number;
    vehicleModel: string;
    segment: string;
    pricePerDay: number;
    kind: Kind;
}

export interface VehicleDto {
    kindId: number;
    vehicleModel: string;
    segment: string;
    pricePerDay: number;
}