import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';

import { selectUser } from '../store/user/userSlice';

const ProtectedRoute: React.FC = () => {
  const user = useAppSelector(selectUser);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
