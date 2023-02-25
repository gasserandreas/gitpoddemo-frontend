import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Footer from './components/Footer';

import * as PATHS from './paths';

const Layout = () => (
  <div>
    <header>
      <ul>
        <li>
          <Link to={PATHS.INDEX}>Songs</Link>
        </li>
        <li>
          <Link to={PATHS.ABOUT}>About</Link>
        </li>
      </ul>
    </header>
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
