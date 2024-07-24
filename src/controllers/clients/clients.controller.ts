import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientAddForm } from 'src/dto/client-form';
import { clientIndexDTO } from 'src/dto/client-index.dto';
import { Client } from 'src/entities/client';
import { Repository } from 'typeorm';

@Controller('clients')
export class ClientsController {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ) {}

    @Get()
    async getAll() {
        const clients = await this.clientRepository.find()
        return clients.map(client => new clientIndexDTO(client))
    }

    @Get('/:reference')
    async getOne(@Param('reference') ref: string) {
        const client = await this.clientRepository.findOne({
            where: {
                reference: ref
            }
        })

        if(!client) {
            throw new Error('Client not found')
        }

        return new clientIndexDTO(client)
    }

    @Post()
    async create(@Body() form: ClientAddForm) {
        const client = {
            ...form,
            createdAt: new Date(),
            updatedAt: null
        }

        if(!client) {
            throw new Error('Client not found')
        }

        return await this.clientRepository.save(client);
    }
    
    @Delete('/:reference')
    async delete(@Param('reference') ref: string) {
        const client = await this.clientRepository.findOne({
            where: {
                reference: ref
            }
        })
        
        if(!client) {
            throw new Error('Client not found')
        }

        return await this.clientRepository.remove(client)
    }
}
