import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Item from './item';

import * as PATHS from '../../paths';

const StyledHeader = styled('header')(() => ({
  padding: '2rem 0 1rem',
}));

const StyledNav = styled('ul')(() => ({
  display: 'flex',
  flexFlow: 'row',
  listStyle: 'none',
  paddingLeft: 0,
}));

const Header = () => (
  <StyledHeader>
    <Typography variant="h3">Songs to learn</Typography>
    <StyledNav >
      <Item to={PATHS.INDEX}>Songs</Item>
      <Item to={PATHS.ABOUT}>About</Item>
    </StyledNav>
  </StyledHeader>
);

export default Header;
