import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, order => order.orderProducts)
    order: Order;

    @ManyToOne(() => Product, product => product.orderProducts)
    product: Product;
}