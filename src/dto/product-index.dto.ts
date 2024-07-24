import { Product } from "src/entities/product";

export class ProductIndexDTO {
    id: number;
    reference: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    modificationStock: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(product: Product) {
        this.id = product.id;
        this.reference = product.reference;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.modificationStock = product.modificationStock;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}