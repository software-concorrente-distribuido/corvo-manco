import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home';
import Booking from '../components/pages/Booking';
import ProtectedRoute from './protectedRoutes';
import App from '../App';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
    ]}
]);
