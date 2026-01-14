import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Import Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';


// Import pages
import LandingPage from './pages/landing-page';
import MyWorkPage from './pages/Dashboard';
import AllProjectsPage from './pages/projects/AllProjects';
import MyTask from './pages/MyTask';
import Inbox from './pages/inbox';
import Setting_1 from './pages/Setting_1';
import HelperCenter from './pages/HelperCenter';
import MyCalendar from './pages/MyCalendar';
import Gantt from './pages/GanttChart';
import WorkspaceSetting from './features/workspace/components/Setting_workspace';
import WorkspaceMember from './pages/WorkspaceMember';
// Import Trash and Archived Pages
import TrashBin from './pages/Trash';
import ArchivedStorePage from './pages/Archived';

// Import Error Pages
import Error404 from './pages/Error/Error404';
import Error500 from './pages/Error/Error500';

/*
 * Configure routing for the application using React Router v6.
 * The MainLayout component wraps around internal pages to provide consistent layout with Sidebar.
 */
const router = createBrowserRouter([
  { path: '/',
    element: <LandingPage />,
    errorElement: <Error500 />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    element: <MainLayout />, // Bọc các trang nội bộ trong Layout có Sidebar
    errorElement: <Error500 />,
    children: [
      { path: 'dashboard', element: <MyWorkPage /> },
      { path: 'projects', element: <AllProjectsPage /> },
      { path: 'tasks', element: <MyTask /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'settings', element: <Setting_1 /> },
      { path: 'help', element: <HelperCenter /> },
      { path: 'trash', element: <TrashBin /> },
      { path: 'calendar', element: <MyCalendar /> },
      { path: 'gantt', element: <Gantt /> },
      { path: 'workspace-settings', element: <WorkspaceSetting /> },
      { path: 'members' , element: <WorkspaceMember /> },
      { path: 'archive', element: <ArchivedStorePage /> },
      // Điều hướng mặc định nếu vào /
      { path: 'home', element: <Navigate to="/dashboard" replace /> },
    ],
  },
  {
    path: '*',
    element: <Error404 />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;