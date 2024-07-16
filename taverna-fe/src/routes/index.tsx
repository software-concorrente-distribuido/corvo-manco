import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home';
import Booking from '../components/pages/Booking';
import ProtectedRoute from './protectedRoutes';

const ComponentRoutes: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <ProtectedRoute>
          <Route element={<Booking />} path="/booking" />
        </ProtectedRoute>
      </Routes>
    </BrowserRouter>
  );
};

export default ComponentRoutes;
