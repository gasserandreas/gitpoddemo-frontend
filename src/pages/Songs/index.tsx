import { Routes, Route } from 'react-router-dom';

import List from './list';
import Details from './details';
import Add from './add';

const Index = () => (
  <Routes>
    <Route index element={<List />} />
    <Route path="add" element={<Add />} />
    <Route path=":songId" element={<Details />} />
  </Routes>
);

export default Index;
