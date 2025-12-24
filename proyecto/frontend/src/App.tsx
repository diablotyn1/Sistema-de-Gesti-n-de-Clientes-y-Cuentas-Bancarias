import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ClientesPage } from './pages/ClientePage';
import { CuentasPage } from './pages/CuentaPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/clientes" replace />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/:id/cuentas" element={<CuentasPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;