import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home';
import Booking from '../components/pages/Booking';

const ComponentRoutes: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Booking />} path="/booking" />
      </Routes>
    </BrowserRouter>
  );
};

export default ComponentRoutes;
