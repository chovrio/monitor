import { Navigate, type RouteObject } from 'react-router-dom';
import Login from '../views/Login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'home/system'} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    children: [
      {
        path: 'system',
        element: <div>test</div>,
      },
    ],
  },
];

export default routes;
