import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./orderProduct";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    reference: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'decimal', precision: 7, scale: 2 })
    price: number

    @Column()
    stock: number

    @Column() 
    modificationStock: number

    @Column()
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[]
}