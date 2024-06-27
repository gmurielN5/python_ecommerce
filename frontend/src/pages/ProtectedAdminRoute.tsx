import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';

import { selectUser } from '../store/user/userSlice';

const ProtectedAdminRoute: React.FC = () => {
  const user = useAppSelector(selectUser);
  return user?.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedAdminRoute;
