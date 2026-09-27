import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Cabecalho from '../components/Cabecalho.tsx'

export default function Layout() {
  return (
    <>
      <Cabecalho />
      <Outlet />
      <Toaster richColors position="top-center" />
    </>
  )
}
