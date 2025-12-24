import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import type { Cuenta, CreateCuentaDto } from '../../types/cuenta.types';
import { TIPOS_PRODUCTO, MONEDAS, SUCURSALES } from '../../types/cuenta.types';

interface CuentaFormProps {
  cuenta?: Cuenta;
  onSubmit: (data: CreateCuentaDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CuentaForm: React.FC<CuentaFormProps> = ({
  cuenta,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateCuentaDto>({
    tipo_producto: 'caja de ahorro',
    numero_cuenta: '',
    moneda: 'BOB',
    monto: 0,
    sucursal: 'La Paz',
  });

  useEffect(() => {
    if (cuenta) {
      setFormData({
        tipo_producto: cuenta.tipo_producto,
        numero_cuenta: cuenta.numero_cuenta,
        moneda: cuenta.moneda,
        monto: cuenta.monto,
        sucursal: cuenta.sucursal,
      });
    }
  }, [cuenta]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'monto' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Producto *
          </label>
          <select
            name="tipo_producto"
            value={formData.tipo_producto}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {TIPOS_PRODUCTO.map(tipo => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Cuenta *
          </label>
          <input
            type="text"
            name="numero_cuenta"
            value={formData.numero_cuenta}
            onChange={handleChange}
            required
            maxLength={20}
            placeholder="Ej: 1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moneda *
          </label>
          <select
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {MONEDAS.map(moneda => (
              <option key={moneda.value} value={moneda.value}>
                {moneda.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monto Inicial
          </label>
          <input
            type="number"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sucursal *
        </label>
        <select
          name="sucursal"
          value={formData.sucursal}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {SUCURSALES.map(sucursal => (
            <option key={sucursal.value} value={sucursal.value}>
              {sucursal.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : cuenta ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};