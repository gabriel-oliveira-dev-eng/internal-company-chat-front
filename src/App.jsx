import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoutes from './components/PrivateRoutes'; // Importe o componente
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Rota pública que não exige autenticação */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}