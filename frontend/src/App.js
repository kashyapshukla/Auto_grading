import './App.css'
import LoginPage from '../src/components/Home/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginStudent from './components/login_and_signup/LoginStudent'
import ErrorPage from './components/Error/ErrorPage'
import SignupStudent from './components/login_and_signup/SignupStudent'
import Upload from './components/Upload/upload'
import { GoogleLogin } from '@react-oauth/google';
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
    ],
  },
])

const App = () => {
  return <RouterProvider router={routes} />
}

export default App
