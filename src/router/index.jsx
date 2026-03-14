import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../pages/Dashboard';
import { Log } from '../pages/Log';
import { AddEntry } from '../pages/AddEntry';
import { Reflections } from '../pages/Reflections';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Routes that use the main Layout with the BottomNav */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="log" element={<Log />} />
        <Route path="add" element={<AddEntry />} />
      </Route>
      
      {/* The Reflections route is now outside the Layout, so it will be full-screen */}
      <Route path="reflections" element={<Reflections />} />
    </Routes>
  );
};