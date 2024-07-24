import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client";
import { OrderProduct } from "./orderProduct";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    clientId: number

    @Column()
    reference: string
    
    @Column({
        default: 'InProgress'
    })
    state: string
    
    @Column()
    createdAt: Date
    
    @Column ({ nullable: true })
    updatedAt: Date

    @Column()
    total: string
    
    @ManyToOne(() => Client, client => client.orders)
    client: Client

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    orderProducts: OrderProduct[];
}