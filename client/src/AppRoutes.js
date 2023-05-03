import { Route, Routes } from "react-router-dom";
import { FormPage, DonePage } from "./pages";
const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/done" element={<DonePage />} />
   </Routes>
);

export default AppRoutes;
