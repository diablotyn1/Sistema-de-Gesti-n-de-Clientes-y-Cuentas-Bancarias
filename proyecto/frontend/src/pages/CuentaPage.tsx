import React from 'react';

// Esta página es opcional y no se usa actualmente
// Las cuentas se gestionan desde el detalle del cliente en ClientesPage
// Puedes eliminar este archivo o implementarlo si deseas una vista independiente de cuentas

export const CuentasPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Cuentas Bancarias</h1>
      <p className="text-gray-600 mt-4">
        Las cuentas se gestionan desde el detalle de cada cliente.
      </p>
    </div>
  );
};