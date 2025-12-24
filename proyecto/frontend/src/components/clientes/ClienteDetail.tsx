import React from 'react';
import type { Cliente } from '../../types/cliente.types';
import type { Cuenta } from '../../types/cuenta.types';
import { CreditCard, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';

interface ClienteDetailProps {
  cliente: Cliente;
  onAddCuenta: () => void;
  onEditCuenta: (cuenta: Cuenta) => void;
  onDeleteCuenta: (cuentaId: number) => void;
}

export const ClienteDetail: React.FC<ClienteDetailProps> = ({
  cliente,
  onAddCuenta,
  onEditCuenta,
  onDeleteCuenta,
}) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatMoney = (amount: number | string, currency: string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `${currency} ${numAmount.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Información del Cliente */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre Completo</p>
            <p className="font-medium text-gray-900">
              {cliente.nombre} {cliente.paterno} {cliente.materno}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Documento</p>
            <p className="font-medium text-gray-900">
              {cliente.tipo_documento}: {cliente.documento_identidad}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
            <p className="font-medium text-gray-900">{formatDate(cliente.fecha_nacimiento)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Género</p>
            <p className="font-medium text-gray-900">
              {cliente.genero === 'M' ? 'Masculino' : 'Femenino'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Registro</p>
            <p className="font-medium text-gray-900">{formatDate(cliente.fecha_creacion)}</p>
          </div>
        </div>
      </div>

      {/* Cuentas Bancarias */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <CreditCard className="mr-2" size={20} />
            Cuentas Bancarias ({cliente.cuentas?.length || 0})
          </h3>
          <Button onClick={onAddCuenta}>
            <Plus size={18} className="mr-2" />
            Nueva Cuenta
          </Button>
        </div>

        {cliente.cuentas && cliente.cuentas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cliente.cuentas.map((cuenta) => (
              <div key={cuenta.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Número de Cuenta</p>
                    <p className="text-lg font-bold text-gray-900">{cuenta.numero_cuenta}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditCuenta(cuenta)}
                      className="text-green-600 hover:text-green-900"
                      title="Editar cuenta"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Está seguro de eliminar esta cuenta?')) {
                          onDeleteCuenta(cuenta.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
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
                    <span className="text-sm text-gray-500">Fecha de Apertura:</span>
                    <span className="text-sm text-gray-900">{formatDate(cuenta.fecha_creacion)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <CreditCard size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 mb-4">Este cliente no tiene cuentas registradas</p>
            <Button onClick={onAddCuenta}>
              <Plus size={18} className="mr-2" />
              Crear Primera Cuenta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};