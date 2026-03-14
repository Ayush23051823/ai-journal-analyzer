import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { AnimatePresence, motion } from 'framer-motion';

export const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="pb-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
};