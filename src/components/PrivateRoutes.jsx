import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const isUserAuthenticated = localStorage.getItem('access_token');

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;