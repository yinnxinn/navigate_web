import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import WebsiteForm from '../pages/WebsiteForm';
import Subscription from '../pages/Subscription';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'website/new',
        element: <WebsiteForm />,
      },
      {
        path: 'subscription',
        element: <Subscription />,
      },
    ],
  },
]);

export default router;