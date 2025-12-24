import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Cliente creado exitosamente',
    type: Cliente 
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return await this.clientesService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de clientes',
    type: [Cliente] 
  })
  async findAll(): Promise<Cliente[]> {
    return await this.clientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID con sus cuentas' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente encontrado',
    type: Cliente 
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(@Param('id') id: string): Promise<Cliente> {
    return await this.clientesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente actualizado',
    type: Cliente 
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return await this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un cliente (soft delete)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente eliminado exitosamente' 
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.clientesService.remove(id);
  }
}