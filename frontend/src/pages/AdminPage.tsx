import { Outlet } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <>
      <h1>admin page </h1>
      <Outlet />
    </>
  );
};

export default AdminPage;
