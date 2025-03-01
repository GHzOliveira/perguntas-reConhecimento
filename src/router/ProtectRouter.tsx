import { Navigate } from 'react-router-dom';
import useAdminStore from '../store/useAdminStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const token = useAdminStore((state) => state.token);

  if (!isLoggedIn || !token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;