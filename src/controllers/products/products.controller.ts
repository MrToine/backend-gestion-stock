import { Body, Controller, Delete, Get, Param, Post, Query, Put, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEditForm } from 'src/dto/product-edit-form';
import { ProductAddForm } from 'src/dto/product-form';
import { ProductIndexDTO } from 'src/dto/product-index.dto';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';

@Controller('products')
export class ProductsController {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    @Get()
    async getAll() {
        return await this.productRepository.find()
    }

    @Get('/:value')
    async getByValue(@Param('value') value: string) {
        let product;
        if (!isNaN(+value)) {
            product = await this.productRepository.findOne({
                where: { id: +value }
            });
        } else {
            product = await this.productRepository.findOne({
                where: { reference: value }
            });
        }
    
        if (!product) {
            throw new Error('Product not found');
        }
    
        return new ProductIndexDTO(product);
    }

    @Get('/:reference')
    async getByRef(@Param('reference') ref: string) {
        const product = await this.productRepository.findOne({
            where: {
                reference: ref
            }
        })

        if(!product) {
            throw new Error('Product not found')
        }

        return new ProductIndexDTO(product)
    }

    @Post()
    async create(@Body() form: ProductAddForm) {
        const product = {
            ...form,
            createdAt: new Date(),
            updatedAt: null
        }

        if(!product) {
            throw new Error('Product not found')
        }

        return await this.productRepository.save(product);
    }

    @Patch('/:id/:quantity')
    async updateQuantity(@Param('id') id: number, @Body() update: { quantity: number, operation: 'add' | 'subtract' }) {
        const product = await this.productRepository.findOne({
            where: {
                id: id
            }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        if(update.operation === 'add') {
            product.stock += update.quantity
        } else if(update.operation === 'subtract') {
            product.stock -= update.quantity
        }
        await this.productRepository.save(product);

        return product;
    }

    
    
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        const product = await this.productRepository.findOne({
            where: {
                id: id
            }
        })
        
        if(!product) {
            throw new Error('Product not found')
        }

        return await this.productRepository.remove(product)
    }
}

