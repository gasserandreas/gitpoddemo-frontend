import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Songs from './pages/Songs';
import { SongsContext } from './pages/Songs/SongsContext';

import About from './pages/About';

import * as PATHS from './paths';

function App() {
  const { actions: { getSongs } } = useContext(SongsContext);

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Songs />} />
        <Route path={`${PATHS.SONGS}/*`} element={<Songs />} />
        <Route index path={PATHS.ABOUT} element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
