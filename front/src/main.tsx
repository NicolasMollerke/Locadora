import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './pages/clientes/App.tsx'
import Login from './pages/clientes/Login.tsx'
import Detalhes from './pages/clientes/Detalhes.tsx'
import CadCliente from './pages/clientes/CadCliente.tsx'
import Carrinho from './pages/clientes/Carrinho.tsx'
import AdminFilmes from './pages/admin/AdminFilmes.tsx'
import CentralAlugueis from './pages/admin/CentralAlugueis.tsx'
import './index.css'

import Layout from './layouts/Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import CadastroFilme from './pages/admin/CadastroFilme.tsx'
import HistoricoAlugueis from './pages/clientes/HistoricoAlugueis.tsx'


const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:filmeId', element: <Detalhes /> },
       { path: 'carrinho/:clienteId', element: <Carrinho /> },
      { path: 'cadCliente', element: <CadCliente /> },
      { path: 'historicoAlugueis', element: <HistoricoAlugueis /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'filmes', element: <AdminFilmes /> },
       { path: 'cadastroFilme', element: <CadastroFilme /> },
       { path: 'alugueis', element: <CentralAlugueis /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)