import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectRouter'
import CompanyProtectedRoute from './CompanyProtectRoute'
import { UserLayout } from '../layout/UserLayout'
import AdminLayout from '../pages/admin/layout/layout'

const Home = lazy(() => import('../pages/home/home'))
const LayoutComAdminPanel = lazy(() => import('../pages/identificação'))
const Questionnaire = lazy(() => import('../pages/perguntas/etapas/etapas'))
const Dashboard = lazy(() => import('../pages/admin/pages/Dashboard'))
const UsersPage = lazy(() => import('../pages/admin/pages/telaAdmin'))
const DynamicForm = lazy(() => import('../pages/admin/pages/DynamicForm'))
const CompanySelect = lazy(() => import('../pages/admin/pages/CompanySelect'))


function Router() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UserLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/identificacao/:companyId"
            element={
              <CompanyProtectedRoute>
                <LayoutComAdminPanel />
              </CompanyProtectedRoute>
            }
          />
          <Route path="/identificacao/questionario" element={<Questionnaire />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="dynamic-form" element={<DynamicForm />} />
                    <Route path="company-select" element={<CompanySelect />} />
                    <Route path="*" element={<div>404 - Página Admin não encontrada</div>} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>404 - Página não encontrada</div>} />
        </Routes>
      </UserLayout>
    </Suspense>
  )
}

export default Router