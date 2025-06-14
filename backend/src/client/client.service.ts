import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientModel.findAll();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return client;
  }

  async create(dto: CreateClientDto): Promise<Client> {
    return this.clientModel.create(dto as any);
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    return client.update(dto);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await client.destroy();
  }
}
