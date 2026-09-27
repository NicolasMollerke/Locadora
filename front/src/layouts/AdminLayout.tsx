import { MenuLateral } from "../components/MenuLateral"
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function AdminLayout() {
  return (
    <div className="min-h-screen grid grid-cols-4">
        <div className="col-span-1">
            <MenuLateral />
        </div>
        <div className="col-span-3">
            <Outlet />
        </div>
      <Toaster richColors position="top-center" />
    </div>
  )
}
