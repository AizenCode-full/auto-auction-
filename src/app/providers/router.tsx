import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { DashboardPage } from '@/pages/dashboard/ui/DashboardPage';
import { LotDetailsPage } from '@/pages/lot-details/ui/LotDetailsPage';
import { CreateLotForm } from '@/features/create-lot';
import { Hero } from '@/widgets/hero';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: '',
        element: <Hero />,
      },
      {
        path: 'lots/:id', 
        element: <LotDetailsPage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard/create',
        element: (
          <ProtectedRoute>
            <CreateLotForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
