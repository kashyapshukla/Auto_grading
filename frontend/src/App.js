import './App.css'
import LoginPage from './pages/Home/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginStudent from './pages/login_and_signup/LoginStudent'
import ErrorPage from './pages/Error/ErrorPage'
import SignupStudent from './pages/login_and_signup/SignupStudent'
import Upload from './pages/Upload/upload'
import Profile from './pages/Profile/Profile'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
const routes = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <SignupStudent />,
      },
      {
        path: 'log-in',
        element: <LoginStudent />,
      },
      {
        path: 'upload/:user_Id',
        element: <Upload/>,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: 'upload/',
            element: <Upload />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={routes} />
}

export default App
