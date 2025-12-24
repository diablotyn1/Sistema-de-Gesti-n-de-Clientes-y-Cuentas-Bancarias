import type { Cuenta } from './cuenta.types';

export interface Cliente {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  tipo_documento: string;
  documento_identidad: string;
  fecha_nacimiento: string | Date;
  genero: 'M' | 'F';
  fecha_creacion: string | Date;
  eliminado: boolean;
  cuentas?: Cuenta[];
}

export interface CreateClienteDto {
  nombre: string;
  paterno: string;
  materno: string;
  tipo_documento: string;
  documento_identidad: string;
  fecha_nacimiento: string;
  genero: 'M' | 'F';
}

export interface UpdateClienteDto {
  nombre?: string;
  paterno?: string;
  materno?: string;
  tipo_documento?: string;
  documento_identidad?: string;
  fecha_nacimiento?: string;
  genero?: 'M' | 'F';
}

export const TIPOS_DOCUMENTO = [
  { value: 'CI', label: 'Cédula de Identidad' },
  { value: 'Pasaporte', label: 'Pasaporte' },
  { value: 'RUN', label: 'RUN' },
] as const;

export const GENEROS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
] as const;