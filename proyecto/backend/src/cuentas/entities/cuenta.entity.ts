import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('cuentas')
export class Cuenta {
  @ApiProperty({ description: 'ID único de la cuenta' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'ID del cliente propietario' })
  @Column({ type: 'int' })
  cliente_id: number;

  @ApiProperty({ 
    description: 'Tipo de producto bancario',
    example: 'caja de ahorro'
  })
  @Column({ type: 'varchar', length: 50 })
  tipo_producto: string;

  @ApiProperty({ description: 'Número único de cuenta' })
  @Column({ type: 'varchar', length: 20, unique: true })
  numero_cuenta: string;

  @ApiProperty({ 
    description: 'Moneda de la cuenta',
    example: 'BOB',
    enum: ['BOB', 'USD']
  })
  @Column({ type: 'varchar', length: 3 })
  moneda: string;

  @ApiProperty({ description: 'Monto en la cuenta' })
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  monto: number;

  @ApiProperty({ description: 'Fecha de creación de la cuenta' })
  @CreateDateColumn()
  fecha_creacion: Date;

  @ApiProperty({ 
    description: 'Sucursal donde se abrió la cuenta',
    example: 'La Paz'
  })
  @Column({ type: 'varchar', length: 100 })
  sucursal: string;

  @ApiProperty({ description: 'Marca de eliminación lógica' })
  @Column({ type: 'boolean', default: false })
  eliminado: boolean;

  @ApiProperty({ 
    description: 'Cliente propietario de la cuenta',
    type: () => Cliente
  })
  @ManyToOne(() => Cliente, (cliente) => cliente.cuentas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}