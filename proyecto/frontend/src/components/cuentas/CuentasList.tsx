import React from 'react';
import { Edit, Trash2, CreditCard } from 'lucide-react';
import type { Cuenta } from '../../types/cuenta.types';

interface CuentasListProps {
  cuentas: Cuenta[];
  onEdit: (cuenta: Cuenta) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const CuentasList: React.FC<CuentasListProps> = ({
  cuentas,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatMoney = (amount: number | string, currency: string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `${currency} ${numAmount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Cargando cuentas...</p>
      </div>
    );
  }

  if (cuentas.length === 0) {
    return (
      <div className="text-center py-8">
        <CreditCard size={48} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-500">No hay cuentas registradas</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cuentas.map((cuenta) => (
        <div
          key={cuenta.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm text-gray-500">Número de Cuenta</p>
              <p className="text-lg font-bold text-gray-900">{cuenta.numero_cuenta}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(cuenta)}
                className="text-green-600 hover:text-green-900 transition-colors"
                title="Editar cuenta"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('¿Está seguro de eliminar esta cuenta?')) {
                    onDelete(cuenta.id);
                  }
                }}
                className="text-red-600 hover:text-red-900 transition-colors"
                title="Eliminar cuenta"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Tipo:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {cuenta.tipo_producto}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Saldo:</span>
              <span className="text-sm font-bold text-green-600">
                {formatMoney(cuenta.monto, cuenta.moneda)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sucursal:</span>
              <span className="text-sm font-medium text-gray-900">{cuenta.sucursal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Fecha:</span>
              <span className="text-sm text-gray-900">{formatDate(cuenta.fecha_creacion)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};