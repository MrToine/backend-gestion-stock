import { Client } from "src/entities/client";
import { Order } from "src/entities/order";
import { Product } from "src/entities/product";

export class OrderProductDTO {
    product: Product;
    quantity: number;
}

export class orderIndexDTO {
    id: number;
    reference: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    client: Client;
    refClient: string;
    products: OrderProductDTO[];
    total: string;

    constructor(order: Order) {
        this.id = order.id;
        this.reference = order.reference;
        this.state = order.state;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
        this.client = order.client;
        this.refClient = order.client ? order.client.reference : null;
        this.products = order.orderProducts ? order.orderProducts.map(op => ({
            product: op.product,
            quantity: op.quantity
        })) : [];
        this.total = order.total;
    }
}