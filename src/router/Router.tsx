import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/DefaultLayout";
import Home from "../pages/home/home";
import LayoutComAdminPanel from "../pages/identificação";
import Questionnaire from "../pages/perguntas/etapas/etapas";
import TelaAdmin from "../pages/admin/telaAdmin";

export function Router() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Layout>
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/identificacao" element={<LayoutComAdminPanel />} />
          <Route path="/identificacao/questionario" element={<Questionnaire />} />
          <Route path="/admin" element={<TelaAdmin />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
