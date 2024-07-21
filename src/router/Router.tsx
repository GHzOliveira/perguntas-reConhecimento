import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/DefaultLayout'
import ProtectedRoute from './ProtectRouter'

const Home = lazy(() => import('../pages/home/home'))
const LayoutComAdminPanel = lazy(() => import('../pages/identificação'))
const Questionnaire = lazy(() => import('../pages/perguntas/etapas/etapas'))
const TabelaUsuarios = lazy(() => import('../pages/admin/pages/telaAdmin'))
const ConfigIdentificacao = lazy(
  () => import('../pages/admin/pages/configIndentificacao')
)
const Dashboard = lazy(() => import('../pages/admin/layout/layout'))

interface RouteItem {
  path: string
  element: React.ReactNode
  protected?: boolean
}

const routes: RouteItem[] = [
  { path: '/', element: <Home /> },
  { path: '/identificacao', element: <LayoutComAdminPanel /> },
  { path: '/identificacao/questionario', element: <Questionnaire /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Dashboard>
          <TabelaUsuarios />
        </Dashboard>
      </ProtectedRoute>
    ),
    protected: true
  },
  {
    path: '/admin/identificacao',
    element: (
      <ProtectedRoute>
        <Dashboard>
          <ConfigIdentificacao />
        </Dashboard>
      </ProtectedRoute>
    ),
    protected: true
  }
]

function Router() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Layout>
        <Routes>
          {routes.map(({ path, element, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>{element}</ProtectedRoute>
                ) : (
                  element
                )
              }
            />
          ))}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </Suspense>
  )
}

export default Router
