import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Import pages
import LandingPage from './pages/landing-page';
import MyWorkPage from './pages/Dashboard';
import AllProjectsPage from './pages/All_Projects';
import MyTask from './pages/MyTask';
import Inbox from './pages/inbox';
import Setting_1 from './pages/Setting_1';
import HelperCenter from './pages/Helper_center';
import TrashBin from './pages/Trash';
import MyCalendar from './pages/MyCalendar';
import WorkspaceSetting from './features/workspace/components/Setting_workspace';

/*
 * Configure routing for the application using React Router v6.
 * The MainLayout component wraps around internal pages to provide consistent layout with Sidebar.
 */
const router = createBrowserRouter([
  { path: '/',
    element: <LandingPage />,
  },
  {
    element: <MainLayout />, // Bọc các trang nội bộ trong Layout có Sidebar
    children: [
      { path: 'dashboard', element: <MyWorkPage /> },
      { path: 'projects', element: <AllProjectsPage /> },
      { path: 'tasks', element: <MyTask /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'settings', element: <Setting_1 /> },
      { path: 'help', element: <HelperCenter /> },
      { path: 'trash', element: <TrashBin /> },
      { path: 'calendar', element: <MyCalendar /> },
      { path: 'workspace-settings', element: <WorkspaceSetting /> },
      // Điều hướng mặc định nếu vào /
      { path: 'home', element: <Navigate to="/dashboard" replace /> },
    ],
  },
  {
    path: '*',
    element: <div className="p-10 text-center">404 - Không tìm thấy trang</div>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;