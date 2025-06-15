import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

const mockClient = {
  id: 1,
  name: 'João da Silva',
  email: 'joao@email.com',
  phone: '999999999',
  company: 'Empresa S/A',
  cep: '12345-678',
  cnpj: '12.345.678/0001-99',
};

// Simulação de uso

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  const mockClientService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [{ provide: ClientService, useValue: mockClientService }],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      mockClientService.create.mockResolvedValue(mockClient);

      const result = await controller.create(mockClient);
      expect(result).toEqual(mockClient);
      expect(mockClientService.create).toHaveBeenCalledWith(mockClient);
    });
  });

  describe('findAll', () => {
    it('should return paginated list', async () => {
      const mockResponse = {
        data: [mockClient],
        total: 1,
        page: 1,
        limit: 10,
        hasMore: false,
      };
      mockClientService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll(
        '1' as unknown as any,
        '10' as unknown as any,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return client by ID', async () => {
      mockClientService.findOne.mockResolvedValue(mockClient);

      const result = await controller.findOne('1' as unknown as any);
      expect(result).toEqual(mockClient);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const dto: UpdateClientDto = {
        name: 'Novo Nome',
        email: 'novo@email.com',
        phone: '123456789',
        company: 'Empresa X',
        cep: undefined,
        cnpj: undefined,
      };
      const updatedClient = { ...mockClient, ...dto };
      mockClientService.update.mockResolvedValue(updatedClient);

      const result = await controller.update('1' as unknown as any, dto);
      expect(result).toEqual(updatedClient);
    });
  });

  describe('remove', () => {
    it('should remove client', async () => {
      const removed = { id: 1 };
      mockClientService.remove.mockResolvedValue(removed);

      const result = await controller.remove('1' as unknown as any);
      expect(result).toEqual(removed);
    });
  });

  describe('cenários negativos', () => {
    it('create - deve lançar erro se falhar', async () => {
      mockClientService.create.mockRejectedValue(new Error('Erro ao criar'));

      await expect(controller.create(mockClient)).rejects.toThrow(
        'Erro ao criar',
      );
    });

    it('findOne - deve lançar erro se não encontrar', async () => {
      mockClientService.findOne.mockRejectedValue(
        new Error('Cliente não encontrado'),
      );

      await expect(controller.findOne('999' as any)).rejects.toThrow(
        'Cliente não encontrado',
      );
    });

    // Simulação de erros

    it('update - deve lançar erro se falhar', async () => {
      const dto: UpdateClientDto = {
        name: 'Novo Nome',
        email: 'novo@email.com',
        phone: '123456789',
        company: 'Empresa X',
        cep: undefined,
        cnpj: undefined,
      };

      mockClientService.update.mockRejectedValue(
        new Error('Erro ao atualizar'),
      );

      await expect(controller.update('1' as any, dto)).rejects.toThrow(
        'Erro ao atualizar',
      );
    });

    it('remove - deve lançar erro se falhar', async () => {
      mockClientService.remove.mockRejectedValue(new Error('Erro ao remover'));

      await expect(controller.remove('1' as any)).rejects.toThrow(
        'Erro ao remover',
      );
    });
  });

  it('update - deve lançar erro ao tentar atualizar cliente inexistente', async () => {
    mockClientService.update.mockRejectedValue(
      new Error('Cliente não encontrado'),
    );

    const dto: UpdateClientDto = {
      name: 'Novo Nome',
      email: 'novo@email.com',
      phone: '123456789',
      company: 'Empresa X',
      cep: undefined,
      cnpj: undefined,
    };

    await expect(controller.update('999' as any, dto)).rejects.toThrow(
      'Cliente não encontrado',
    );
  });

  it('remove - deve lançar erro com ID inválido', async () => {
    await expect(controller.remove('' as any)).rejects.toThrow();
  });

  it('findOne - deve lançar erro com ID não numérico', async () => {
    mockClientService.findOne.mockRejectedValue(new Error('ID inválido'));

    await expect(controller.findOne('abc' as any)).rejects.toThrow(
      'ID inválido',
    );
  });

  it('create - deve lançar erro ao enviar DTO incompleto', async () => {
    const dto = {
      name: 'Nome incompleto',
      // falta email, phone, company
    } as any;

    mockClientService.create.mockRejectedValue(new Error('Dados inválidos'));

    await expect(controller.create(dto)).rejects.toThrow('Dados inválidos');
  });
});
