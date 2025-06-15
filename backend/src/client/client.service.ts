import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Op } from 'sequelize';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
  ) {}

  async findAll(search?: string, page = 1, limit = 4): Promise<Client[]> {
    const offset = (page - 1) * limit;

    const options: any = {
      offset,
      limit,
    };

    if (search) {
      options.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { company: { [Op.like]: `%${search}%` } },
          { cep: { [Op.like]: `%${search}%` } },
          { cnpj: { [Op.like]: `%${search}%` } },
        ],
      };
    }
    return this.clientModel.findAll(options);
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientModel.findByPk(id);
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  async create(dto: CreateClientDto): Promise<Client> {
    const exists = await this.clientModel.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('E-mail já está em uso.');
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
