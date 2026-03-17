import { createBrowserRouter } from 'react-router-dom';

import CoursesPage from '../pages/CoursesPage';
import CoursePage from '../pages/CoursePage';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CoursesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/courses/:id',
    element: <CoursePage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;