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
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Cuenta } from './entities/cuenta.entity';

@ApiTags('cuentas')
@Controller()
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post('clientes/:clienteId/cuentas')
  @ApiOperation({ summary: 'Abrir una cuenta para un cliente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Cuenta creada exitosamente',
    type: Cuenta 
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async create(
    @Param('clienteId') clienteId: string,
    @Body() createCuentaDto: CreateCuentaDto,
  ): Promise<Cuenta> {
    return await this.cuentasService.create(clienteId, createCuentaDto);
  }

  @Get('clientes/:clienteId/cuentas')
  @ApiOperation({ summary: 'Listar todas las cuentas de un cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de cuentas del cliente',
    type: [Cuenta] 
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findByCliente(
    @Param('clienteId') clienteId: string,
  ): Promise<Cuenta[]> {
    return await this.cuentasService.findByCliente(clienteId);
  }

  @Get('cuentas/:id')
  @ApiOperation({ summary: 'Obtener una cuenta por ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cuenta encontrada',
    type: Cuenta 
  })
  @ApiResponse({ status: 404, description: 'Cuenta no encontrada' })
  async findOne(@Param('id') id: string): Promise<Cuenta> {
    return await this.cuentasService.findOne(id);
  }

  @Put('cuentas/:id')
  @ApiOperation({ summary: 'Actualizar una cuenta' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cuenta actualizada',
    type: Cuenta 
  })
  @ApiResponse({ status: 404, description: 'Cuenta no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateCuentaDto: UpdateCuentaDto,
  ): Promise<Cuenta> {
    return await this.cuentasService.update(id, updateCuentaDto);
  }

  @Delete('cuentas/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una cuenta (soft delete)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cuenta eliminada exitosamente' 
  })
  @ApiResponse({ status: 404, description: 'Cuenta no encontrada' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.cuentasService.remove(id);
  }
}