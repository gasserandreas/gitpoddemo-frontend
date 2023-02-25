import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Songs from './pages/Songs';
import About from './pages/About';

import * as PATHS from './paths';

function App() {
  return (
    <Routes>
      <Route path={PATHS.INDEX} element={<Layout />}>
        <Route index element={<Songs />} />
        <Route index path={PATHS.ABOUT} element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
