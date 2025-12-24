import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateCuentaDto {
  @ApiProperty({ 
    description: 'Tipo de producto bancario',
    example: 'caja de ahorro',
    enum: ['caja de ahorro', 'cuenta corriente', 'DPF']
  })
  @IsString()
  @IsNotEmpty()
  tipo_producto: string;

  @ApiProperty({ 
    description: 'Número único de cuenta',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  numero_cuenta: string;

  @ApiProperty({ 
    description: 'Moneda de la cuenta',
    example: 'BOB',
    enum: ['BOB', 'USD']
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(BOB|USD)$/, { message: 'La moneda debe ser BOB o USD' })
  moneda: string;

  @ApiProperty({ 
    description: 'Monto inicial de la cuenta',
    example: 1000.00,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  monto?: number;

  @ApiProperty({ 
    description: 'Sucursal donde se abre la cuenta',
    example: 'La Paz',
    enum: ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Tarija', 'Beni', 'Pando', 'Chuquisaca']
  })
  @IsString()
  @IsNotEmpty()
  sucursal: string;
}