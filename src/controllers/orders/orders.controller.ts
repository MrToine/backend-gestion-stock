import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderAddForm } from 'src/dto/order-form';
import { orderIndexDTO } from 'src/dto/order-index.dto';
import { Order } from 'src/entities/order';
import { OrderProduct } from 'src/entities/orderProduct';
import { Product } from 'src/entities/product';
import { Client } from 'src/entities/client';
import { Repository } from 'typeorm';

@Controller('orders')
export class OrdersController {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct)
        private orderProductRepository: Repository<OrderProduct>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ) {}

    @Get()
    async getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        const [orders, totalCount] = await this.orderRepository.findAndCount({
            relations: ['client', 'orderProducts', 'orderProducts.product'],
            take: limit,
            skip: (page - 1) * limit
        });
        return {
            data: orders.map(order => new orderIndexDTO(order)),
            page,
            limit,
            total: await this.orderRepository.count()
        }
    }

    @Get('/:reference')
    async getOne(@Param('reference') ref: string) {
        const order = await this.orderRepository.findOne({
            where: {
                reference: ref
            },
            relations: ['client', 'orderProducts', 'orderProducts.product']
        });

        if(!order) {
            throw new Error('order not found');
        }

        return new orderIndexDTO(order);
    }

    @Post()
    async create(@Body() form: OrderAddForm) {
        const client = await this.clientRepository.findOne({ where: { id: form.clientId } });
        if (!client) {
            throw new Error('Client not found');
        }

        const order = this.orderRepository.create({
            reference: form.reference,
            state: form.state,
            createdAt: form.createdAt,
            total: form.total.toString(),
            client: client,
            updatedAt: null
        });

        const savedOrder = await this.orderRepository.save(order);

        for (const orderProductForm of form.orderProducts) {
            const product = await this.productRepository.findOne({ where: { id: orderProductForm.productId } });
            if (!product) {
                throw new Error(`Product with id ${orderProductForm.productId} not found`);
            }

            const orderProduct = this.orderProductRepository.create({
                order: savedOrder,
                product: product,
                quantity: orderProductForm.quantity
            });

            await this.orderProductRepository.save(orderProduct);
        }

        return new orderIndexDTO(await this.orderRepository.findOne({
            where: { id: savedOrder.id },
            relations: ['client', 'orderProducts', 'orderProducts.product']
        }));
    }

    @Put('/:reference')
    async update(@Param('reference') ref: string, @Body() form: OrderAddForm) {
        console.log("ORDER : ", ref, form);
        const order = await this.orderRepository.findOne({
            where: {
                reference: ref
            },
            relations: ['orderProducts']
        });

        if(!order) {
            throw new Error('order not found');
        }

        const client = await this.clientRepository.findOne({ where: { id: form.clientId } });
        if (!client) {
            throw new Error('Client not found');
        }

        order.client = client;
        order.reference = form.reference;
        order.state = form.state;
        order.createdAt = form.createdAt;
        order.total = form.total.toString();
        order.updatedAt = new Date();

        await this.orderRepository.save(order);

        await this.orderProductRepository.remove(order.orderProducts);

        for (const orderProductForm of form.orderProducts) {
            const product = await this.productRepository.findOne({ where: { id: orderProductForm.productId } });
            if (!product) {
                throw new Error(`Product with id ${orderProductForm.productId} not found`);
            }

            const orderProduct = this.orderProductRepository.create({
                order: order,
                product: product,
                quantity: orderProductForm.quantity
            });

            await this.orderProductRepository.save(orderProduct);
        }

        return new orderIndexDTO(await this.orderRepository.findOne({
            where: { id: order.id },
            relations: ['client', 'orderProducts', 'orderProducts.product']
        }));
    }

    
    @Delete('/:reference')
    async delete(@Param('reference') ref: string) {
        const order = await this.orderRepository.findOne({
            where: {
                reference: ref
            },
            relations: ['orderProducts']
        });
        
        if(!order) {
            throw new Error('order not found');
        }

        // Delete associated OrderProducts first
        await this.orderProductRepository.remove(order.orderProducts);

        // Then delete the order
        return await this.orderRepository.remove(order);
    }
}