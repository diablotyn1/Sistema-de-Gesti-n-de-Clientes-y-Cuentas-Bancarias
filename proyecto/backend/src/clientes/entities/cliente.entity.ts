import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cuenta } from '../../cuentas/entities/cuenta.entity';

@Entity('clientes')
export class Cliente {
  @ApiProperty({ description: 'ID único del cliente' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del cliente' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Apellido paterno' })
  @Column({ type: 'varchar', length: 100 })
  paterno: string;

  @ApiProperty({ description: 'Apellido materno' })
  @Column({ type: 'varchar', length: 100 })
  materno: string;

  @ApiProperty({ 
    description: 'Tipo de documento',
    example: 'CI'
  })
  @Column({ type: 'varchar', length: 20 })
  tipo_documento: string;

  @ApiProperty({ description: 'Número de documento de identidad' })
  @Column({ type: 'varchar', length: 50, unique: true })
  documento_identidad: string;

  @ApiProperty({ description: 'Fecha de nacimiento' })
  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @ApiProperty({ 
    description: 'Género',
    example: 'M'
  })
  @Column({ type: 'varchar', length: 1 })
  genero: string;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn()
  fecha_creacion: Date;

  @ApiProperty({ description: 'Marca de eliminación lógica' })
  @Column({ type: 'boolean', default: false })
  eliminado: boolean;

  @ApiProperty({ 
    description: 'Cuentas asociadas al cliente',
    type: () => [Cuenta]
  })
  @OneToMany(() => Cuenta, (cuenta) => cuenta.cliente)
  cuentas: Cuenta[];
}