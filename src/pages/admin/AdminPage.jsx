import { Outlet } from 'react-router';
import AdminHeader from '../../layout/admin/Adminheader';
import { styled } from '@mui/material';

export const AdminPage = () => {
   return (
      <Container>
         <AdminHeader />
         <Outlet />
      </Container>
   );
};

const Container = styled('div')(() => ({
   margin: '0 0 120px 0',
}));
