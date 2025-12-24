export interface Cuenta {
  id: number;
  cliente_id: number;
  tipo_producto: string;
  numero_cuenta: string;
  moneda: 'BOB' | 'USD';
  monto: number | string; // Puede venir como string desde la BD
  fecha_creacion: string | Date;
  sucursal: string;
  eliminado: boolean;
}

export interface CreateCuentaDto {
  tipo_producto: string;
  numero_cuenta: string;
  moneda: 'BOB' | 'USD';
  monto?: number;
  sucursal: string;
}

export interface UpdateCuentaDto {
  tipo_producto?: string;
  numero_cuenta?: string;
  moneda?: 'BOB' | 'USD';
  monto?: number;
  sucursal?: string;
}

export const TIPOS_PRODUCTO = [
  { value: 'caja de ahorro', label: 'Caja de Ahorro' },
  { value: 'cuenta corriente', label: 'Cuenta Corriente' },
  { value: 'DPF', label: 'DPF (Depósito a Plazo Fijo)' },
] as const;

export const MONEDAS = [
  { value: 'BOB', label: 'BOB - Bolivianos' },
  { value: 'USD', label: 'USD - Dólares' },
] as const;

export const SUCURSALES = [
  { value: 'La Paz', label: 'La Paz' },
  { value: 'Cochabamba', label: 'Cochabamba' },
  { value: 'Santa Cruz', label: 'Santa Cruz' },
  { value: 'Oruro', label: 'Oruro' },
  { value: 'Potosí', label: 'Potosí' },
  { value: 'Tarija', label: 'Tarija' },
  { value: 'Beni', label: 'Beni' },
  { value: 'Pando', label: 'Pando' },
  { value: 'Chuquisaca', label: 'Chuquisaca' },
] as const;