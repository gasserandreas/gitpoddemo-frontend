import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import Footer from '../Footer';
import Header from '../Header';

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const StyledContent = styled(Box)(() => ({
  flex: 1,
}));

const Layout = () => (
    <StyledContainer maxWidth="sm">
      <Header />
      <StyledContent>
        <Outlet />
      </StyledContent>
      <Footer />
    </StyledContainer>
);

export default Layout;
