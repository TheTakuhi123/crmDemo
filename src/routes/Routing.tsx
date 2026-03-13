import { Navigate, Route, Routes } from "react-router-dom";

import ClientsPage from "../pages/ClientsPage";
import DetailPage from "../pages/DetailPage";

const DefaultRoutes = () => (
  <Routes>
    <Route path="/" element={<ClientsPage />} />
    <Route path="/clients/:id/*" element={<DetailPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default DefaultRoutes;
