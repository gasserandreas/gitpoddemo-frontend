import { FC, ReactNode } from 'react';

import { Link as RouterLink  } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const StyledItem = styled('li')(() => ({
  display: 'inline-block',
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  padding: '0.5rem 0.75rem',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[100],
  },
}));

type LinkProps = {
  to: string,
  children: ReactNode,
  active?: boolean,
};

const Link: FC<LinkProps> = ({ to, children, active }) => (
  <StyledItem>
    <StyledLink to={to}>{children}</StyledLink>
  </StyledItem>
);

export default Link;
