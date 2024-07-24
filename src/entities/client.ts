import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    reference: string

    @Column()
    firstname: string

    @Column()
    lastname: string
    
    @Column()
    email: string
    
    @Column()
    tel: number
    
    @Column()
    createdAt: Date
    
    @Column({ nullable: true })
    updatedAt: Date

    @OneToMany(() => Order, order => order.client)
    orders: Order[]
}