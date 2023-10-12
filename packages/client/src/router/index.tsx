import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import Login from '../views/Login';
import Home from '@/views/Home';
const Site = lazy(() => import('@/views/Home/Site'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'home/overview'} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'overview',
        element: <div>test</div>,
      },
      {
        path: 'flow',
        element: <div>flow</div>,
      },
      {
        path: 'user',
        children: [
          {
            path: 'area',
            element: <div>area</div>,
          },
          {
            path: 'system',
            element: <div>system</div>,
          },
          {
            path: 'old',
            element: <div>old</div>,
          },
        ],
      },
      {
        path: 'visit',
        children: [
          {
            path: 'page',
            element: <div>page</div>,
          },
          {
            path: 'entry',
            element: <div>entry</div>,
          },
        ],
      },
      {
        path: 'site',
        element: <Site />,
      },
    ],
  },
];

export default routes;
