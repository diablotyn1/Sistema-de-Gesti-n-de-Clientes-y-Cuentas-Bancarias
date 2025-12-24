import api from './api';
import type { Cliente, CreateClienteDto, UpdateClienteDto } from '../types/cliente.types';

export const clienteService = {
  // Obtener todos los clientes
  getAll: async (): Promise<Cliente[]> => {
    const response = await api.get<Cliente[]>('/clientes');
    return response.data;
  },

  // Obtener un cliente por ID (incluye cuentas)
  getById: async (id: number): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },

  // Crear un nuevo cliente
  create: async (data: CreateClienteDto): Promise<Cliente> => {
    const response = await api.post<Cliente>('/clientes', data);
    return response.data;
  },

  // Actualizar un cliente
  update: async (id: number, data: UpdateClienteDto): Promise<Cliente> => {
    const response = await api.put<Cliente>(`/clientes/${id}`, data);
    return response.data;
  },

  // Eliminar un cliente (soft delete)
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/clientes/${id}`);
    return response.data;
  },
};