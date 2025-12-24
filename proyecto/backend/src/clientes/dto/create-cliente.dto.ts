import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ 
    description: 'Nombre del cliente',
    example: 'Juan'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ 
    description: 'Apellido paterno',
    example: 'Pérez'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  paterno: string;

  @ApiProperty({ 
    description: 'Apellido materno',
    example: 'García'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  materno: string;

  @ApiProperty({ 
    description: 'Tipo de documento de identidad',
    example: 'CI',
    enum: ['CI', 'Pasaporte', 'RUN']
  })
  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @ApiProperty({ 
    description: 'Número de documento de identidad',
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  documento_identidad: string;

  @ApiProperty({ 
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
    example: '1990-05-15'
  })
  @IsDateString()
  @IsNotEmpty()
  fecha_nacimiento: Date;

  @ApiProperty({ 
    description: 'Género (M: Masculino, F: Femenino)',
    example: 'M',
    enum: ['M', 'F']
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[MF]$/, { message: 'El género debe ser M o F' })
  genero: string;
}