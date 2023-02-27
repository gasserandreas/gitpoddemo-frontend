import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(() => ({
  padding: '1rem',
  textAlign: 'center',
}));

const Footer = () => (
  <StyledFooter>
    Created by:
    {' '}
    <Link href="https://andreasgasser.com" target="_blank">
      Andreas Liistro
    </Link>
  </StyledFooter>
);

export default Footer;
