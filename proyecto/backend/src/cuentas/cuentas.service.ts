import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepository: Repository<Cuenta>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  // Crear una cuenta para un cliente
  async create(
    clienteId: string,
    createCuentaDto: CreateCuentaDto,
  ): Promise<Cuenta> {
    const numericClienteId = parseInt(clienteId, 10);
    
    // Verificar que el cliente existe y no está eliminado
    const cliente = await this.clienteRepository.findOne({
      where: { id: numericClienteId, eliminado: false },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    // Verificar que no exista una cuenta con el mismo número
    const existente = await this.cuentaRepository.findOne({
      where: { numero_cuenta: createCuentaDto.numero_cuenta },
    });

    if (existente) {
      throw new BadRequestException(
        'Ya existe una cuenta con ese número de cuenta',
      );
    }

    const cuenta = this.cuentaRepository.create({
      ...createCuentaDto,
      cliente_id: numericClienteId,
    });

    return await this.cuentaRepository.save(cuenta);
  }

  // Listar todas las cuentas de un cliente
  async findByCliente(clienteId: string): Promise<Cuenta[]> {
    const numericClienteId = parseInt(clienteId, 10);
    
    // Verificar que el cliente existe
    const cliente = await this.clienteRepository.findOne({
      where: { id: numericClienteId, eliminado: false },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    return await this.cuentaRepository.find({
      where: { cliente_id: numericClienteId, eliminado: false },
      order: { fecha_creacion: 'DESC' },
    });
  }

  // Obtener una cuenta por ID
  async findOne(id: string): Promise<Cuenta> {
    const numericId = parseInt(id, 10);
    
    const cuenta = await this.cuentaRepository.findOne({
      where: { id: numericId, eliminado: false },
      relations: ['cliente'],
    });

    if (!cuenta) {
      throw new NotFoundException(`Cuenta con ID ${id} no encontrada`);
    }

    return cuenta;
  }

  // Actualizar una cuenta
  async update(id: string, updateCuentaDto: UpdateCuentaDto): Promise<Cuenta> {
    const numericId = parseInt(id, 10);
    const cuenta = await this.findOne(id);

    // Si se está actualizando el número de cuenta, verificar que no exista otro
    if (updateCuentaDto.numero_cuenta) {
      const existente = await this.cuentaRepository.findOne({
        where: { numero_cuenta: updateCuentaDto.numero_cuenta },
      });

      if (existente && existente.id !== numericId) {
        throw new BadRequestException(
          'Ya existe otra cuenta con ese número de cuenta',
        );
      }
    }

    Object.assign(cuenta, updateCuentaDto);
    return await this.cuentaRepository.save(cuenta);
  }

  // Eliminar cuenta (soft delete)
  async remove(id: string): Promise<{ message: string }> {
    const cuenta = await this.findOne(id);

    cuenta.eliminado = true;
    await this.cuentaRepository.save(cuenta);

    return { message: `Cuenta ${id} eliminada exitosamente` };
  }
}