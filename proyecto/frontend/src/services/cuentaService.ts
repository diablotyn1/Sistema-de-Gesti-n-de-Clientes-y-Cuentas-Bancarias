import api from './api';
import type { Cuenta, CreateCuentaDto, UpdateCuentaDto } from '../types/cuenta.types';

export const cuentaService = {
  // Obtener todas las cuentas de un cliente
  getByCliente: async (clienteId: number): Promise<Cuenta[]> => {
    const response = await api.get<Cuenta[]>(`/clientes/${clienteId}/cuentas`);
    return response.data;
  },

  // Obtener una cuenta por ID
  getById: async (id: number): Promise<Cuenta> => {
    const response = await api.get<Cuenta>(`/cuentas/${id}`);
    return response.data;
  },

  // Crear una cuenta para un cliente
  create: async (clienteId: number, data: CreateCuentaDto): Promise<Cuenta> => {
    const response = await api.post<Cuenta>(`/clientes/${clienteId}/cuentas`, data);
    return response.data;
  },

  // Actualizar una cuenta
  update: async (id: number, data: UpdateCuentaDto): Promise<Cuenta> => {
    const response = await api.put<Cuenta>(`/cuentas/${id}`, data);
    return response.data;
  },

  // Eliminar una cuenta (soft delete)
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/cuentas/${id}`);
    return response.data;
  },
};