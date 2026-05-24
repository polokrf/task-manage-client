import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import Login from '../Page/AuthPage/Login';
import Register from '../Page/AuthPage/Register';
import DashboardLayout from '../Page/Dashboard/DashboardLayout';
import Dashboard from '../Page/Dashboard/Dashboard';
import PrivetRoute from '../privetRoute/PrivetRoute';
import AllUser from '../Page/Dashboard/Admin/user/AllUser';
import TaskManage from '../Page/Dashboard/Admin/TaskManage';
import AssignTask from '../Page/Dashboard/Admin/AssignTask';
import MyTask from '../Page/Dashboard/Employ/MyTask';

import Profile from '../Page/Dashboard/Employ/Profile';
import TaskDetails from '../Page/Dashboard/Admin/TaskDetails';
import CompletedTask from '../Page/Dashboard/Employ/CompletedTask';
import MyTaskDetails from '../Page/Dashboard/Employ/MyTaskDetails';
import AdminPrivetRoute from '../privetRoute/AdminPrivetRoute';
import Error from '../Components/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },

  {
    path: '/dashboard',
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    errorElement: <Error/>,
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivetRoute>
            <Dashboard />
          </PrivetRoute>
        ),
      },

      {
        path: '/dashboard/all-user',
        element: (
          <AdminPrivetRoute>
            <AllUser />
          </AdminPrivetRoute>
        ),
      },

      {
        path: '/dashboard/task',
        element: (
          <AdminPrivetRoute>
            <TaskManage />
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/task/:id',
        element: (
          <AdminPrivetRoute>
            <TaskDetails />
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/assign-task',
        element: (
          <AdminPrivetRoute>
            <AssignTask />
          </AdminPrivetRoute>
        ),
      },
      {
        path: '/dashboard/my-task',
        element: (
          <PrivetRoute>
            <MyTask />
          </PrivetRoute>
        ),
      },
      {
        path: '/dashboard/my-task/:id',
        element: (
          <PrivetRoute>
            <MyTaskDetails />
          </PrivetRoute>
        ),
      },
      {
        path: '/dashboard/task-status',
        element: (
          <PrivetRoute>
            <CompletedTask />
          </PrivetRoute>
        ),
      },
      {
        path: '/dashboard/my-profile',
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
