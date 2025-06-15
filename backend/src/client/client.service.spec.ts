import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getModelToken } from '@nestjs/sequelize';
import { Client } from './client.model';

const mockClientModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
};

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getModelToken(Client),
          useValue: mockClientModel,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return clients from findAll', async () => {
    mockClientModel.findAll.mockResolvedValue([
      { id: 1, name: 'Davi', email: 'davi@mail.com' },
    ]);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(mockClientModel.findAll).toHaveBeenCalled();
  });

  it('should return one client by ID', async () => {
    const mockClient = { id: 1, name: 'João', email: 'joao@mail.com' };
    mockClientModel.findByPk.mockResolvedValue(mockClient);

    const result = await service.findOne(1);
    expect(result).toEqual(mockClient);
  });

  it('should throw error if client not found', async () => {
    mockClientModel.findByPk.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow('Cliente não encontrado');
  });

  it('should create a new client', async () => {
    const dto = { name: 'Novo', email: 'novo@mail.com' };
    mockClientModel.findOne.mockResolvedValue(null);
    mockClientModel.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
  });

  it('should not allow duplicate email', async () => {
    mockClientModel.findOne.mockResolvedValue({ id: 1 });

    await expect(
      service.create({ email: 'x@x.com', name: 'X' } as any),
    ).rejects.toThrow('E-mail já está em uso.');
  });
});
