import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  // Crear un nuevo cliente
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    // Verificar que no exista un cliente con el mismo documento
    const existente = await this.clienteRepository.findOne({
      where: { 
        documento_identidad: createClienteDto.documento_identidad,
        eliminado: false 
      },
    });

    if (existente) {
      throw new BadRequestException(
        'Ya existe un cliente con ese documento de identidad',
      );
    }

    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  // Listar todos los clientes (excluye eliminados)
  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: { eliminado: false },
      order: { fecha_creacion: 'DESC' },
    });
  }

  // Obtener un cliente por ID con sus cuentas
  async findOne(id: string): Promise<Cliente> {
    const numericId = parseInt(id, 10);
    
    const cliente = await this.clienteRepository.findOne({
      where: { id: numericId, eliminado: false },
      relations: ['cuentas'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    // Filtrar cuentas no eliminadas
    cliente.cuentas = cliente.cuentas.filter(cuenta => !cuenta.eliminado);

    return cliente;
  }

  // Actualizar un cliente
  async update(
    id: string,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const numericId = parseInt(id, 10);
    const cliente = await this.findOne(id);

    // Si se está actualizando el documento, verificar que no exista otro
    if (updateClienteDto.documento_identidad) {
      const existente = await this.clienteRepository.findOne({
        where: { documento_identidad: updateClienteDto.documento_identidad },
      });

      if (existente && existente.id !== numericId) {
        throw new BadRequestException(
          'Ya existe otro cliente con ese documento de identidad',
        );
      }
    }

    Object.assign(cliente, updateClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  // Eliminar cliente (soft delete)
  async remove(id: string): Promise<{ message: string }> {
    const cliente = await this.findOne(id);

    // Marcar como eliminado
    cliente.eliminado = true;
    await this.clienteRepository.save(cliente);

    return { message: `Cliente ${id} eliminado exitosamente` };
  }
}