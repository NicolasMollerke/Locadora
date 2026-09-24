import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Detalhes from './pages/Detalhes.tsx'
import CadCliente from './pages/CadCliente.tsx'
import Carrinho from './pages/Carrinho.tsx'
import './index.css'

import Layout from './pages/Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin.tsx'

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
    ],
  },
  // {
  //   path: '/admin',
  //   element: <Layout />,
  //   children: [
  //     { index: true, element: <App /> },
  //     { path: 'login', element: <Login /> },
  //     { path: 'detalhes/:filmeId', element: <Detalhes /> },
  //      { path: 'carrinho/:clienteId', element: <Carrinho /> },
  //     { path: 'cadCliente', element: <CadCliente /> },
  //     { path: 'login', element: <Login /> },
  //   ],
  // },
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