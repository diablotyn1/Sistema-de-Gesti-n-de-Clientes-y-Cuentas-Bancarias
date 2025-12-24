import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ClientesList } from '../components/clientes/ClientesList';
import { ClienteForm } from '../components/clientes/ClienteForm';
import { ClienteDetail } from '../components/clientes/ClienteDetail';
import { CuentaForm } from '../components/cuentas/CuentaForm';
import { clienteService } from '../services/clienteService';
import { cuentaService } from '../services/cuentaService';
import type { Cliente, CreateClienteDto } from '../types/cliente.types';
import type { Cuenta, CreateCuentaDto } from '../types/cuenta.types';

export const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCuentaFormOpen, setIsCuentaFormOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | undefined>(undefined);
  const [editingCuenta, setEditingCuenta] = useState<Cuenta | undefined>(undefined);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setIsLoading(true);
      const data = await clienteService.getAll();
      setClientes(data);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar clientes');
      console.error('Error loading clientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCliente(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setIsFormOpen(true);
  };

  const handleView = async (cliente: Cliente) => {
    try {
      setIsLoading(true);
      const data = await clienteService.getById(cliente.id);
      console.log('Cliente detalle:', data);
      setSelectedCliente(data);
      setIsDetailOpen(true);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar detalle del cliente');
      console.error('Error loading cliente detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: CreateClienteDto) => {
    try {
      setIsLoading(true);
      if (editingCliente) {
        await clienteService.update(editingCliente.id, data);
        toast.success('Cliente actualizado exitosamente');
      } else {
        await clienteService.create(data);
        toast.success('Cliente creado exitosamente');
      }
      setIsFormOpen(false);
      setEditingCliente(undefined);
      await loadClientes();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar cliente');
      console.error('Error saving cliente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await clienteService.delete(id);
      toast.success('Cliente eliminado exitosamente');
      await loadClientes();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar cliente');
      console.error('Error deleting cliente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCuenta = () => {
    setEditingCuenta(undefined);
    setIsCuentaFormOpen(true);
  };

  const handleEditCuenta = (cuenta: Cuenta) => {
    setEditingCuenta(cuenta);
    setIsCuentaFormOpen(true);
  };

  const handleSubmitCuenta = async (data: CreateCuentaDto) => {
    if (!selectedCliente) return;

    try {
      setIsLoading(true);
      if (editingCuenta) {
        await cuentaService.update(editingCuenta.id, data);
        toast.success('Cuenta actualizada exitosamente');
      } else {
        await cuentaService.create(selectedCliente.id, data);
        toast.success('Cuenta creada exitosamente');
      }
      setIsCuentaFormOpen(false);
      setEditingCuenta(undefined);
      
      // Recargar el detalle del cliente
      const updatedCliente = await clienteService.getById(selectedCliente.id);
      setSelectedCliente(updatedCliente);
      await loadClientes();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar cuenta');
      console.error('Error saving cuenta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCuenta = async (cuentaId: number) => {
    if (!selectedCliente) return;

    try {
      setIsLoading(true);
      await cuentaService.delete(cuentaId);
      toast.success('Cuenta eliminada exitosamente');
      
      // Recargar el detalle del cliente
      const updatedCliente = await clienteService.getById(selectedCliente.id);
      setSelectedCliente(updatedCliente);
      await loadClientes();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar cuenta');
      console.error('Error deleting cuenta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Clientes</h1>
        <Button onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <ClientesList
          clientes={clientes}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </Card>

      {/* Modal Formulario Cliente */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCliente(undefined);
        }}
        title={editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
      >
        <ClienteForm
          cliente={editingCliente}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingCliente(undefined);
          }}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal Detalle Cliente */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedCliente(null);
        }}
        title="Detalle del Cliente"
        size="lg"
      >
        {selectedCliente ? (
          <ClienteDetail
            cliente={selectedCliente}
            onAddCuenta={handleAddCuenta}
            onEditCuenta={handleEditCuenta}
            onDeleteCuenta={handleDeleteCuenta}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando...</p>
          </div>
        )}
      </Modal>

      {/* Modal Formulario Cuenta */}
      <Modal
        isOpen={isCuentaFormOpen}
        onClose={() => {
          setIsCuentaFormOpen(false);
          setEditingCuenta(undefined);
        }}
        title={editingCuenta ? 'Editar Cuenta' : 'Nueva Cuenta'}
      >
        <CuentaForm
          cuenta={editingCuenta}
          onSubmit={handleSubmitCuenta}
          onCancel={() => {
            setIsCuentaFormOpen(false);
            setEditingCuenta(undefined);
          }}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};