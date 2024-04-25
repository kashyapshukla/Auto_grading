import './App.css'
import LoginPage from './pages/Home/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginStudent from './pages/loginandsignup/LoginStudent.jsx'
import ErrorPage from './pages/Error/ErrorPage.jsx'
import SignupStudent from './pages/loginandsignup/SignupStudent.jsx'
import Profile from './pages/Profile/Profile.jsx'
import DashboardLayout from './pages/Dashboard/DashboardLayout.jsx'
import { action as signUpAction } from './pages/loginandsignup/SignupStudent.jsx'
import { action as loginAction } from './pages/loginandsignup/LoginStudent.jsx'
import { loader as dashboardLoader } from './pages/Dashboard/DashboardLayout.jsx'
import AddAssignment from './pages/Assignment/AddAssignment.jsx'
import { action as addAssignmentAction } from './pages/Assignment/AddAssignment.jsx'
import AllAssignments from './pages/Assignment/AllAssignments.jsx'
import { loader as allAssignmentsLoader } from './pages/Assignment/AllAssignments.jsx'
import EditAssignment from './pages/Assignment/EditAssignment.jsx'
import { action as editAssignmentAction } from './pages/Assignment/EditAssignment.jsx'
import { loader as editAssignmentsLoader } from './pages/Assignment/EditAssignment.jsx'
import { action as deleteAssignmentAction } from './pages/Assignment/DeleteAssignment.jsx'
import Admin from './pages/Admin/Admin.jsx'
import { loader as adminLoader } from './pages/Admin/Admin.jsx'
import { action as profileAction } from './pages/Profile/Profile.jsx'
import ViewAssignment from './pages/Assignment/ViewAssignment.jsx'
import { loader as viewAssignmentLoader } from './pages/Assignment/ViewAssignment.jsx'
import { action as viewAssignmentAction } from './pages/Assignment/ViewAssignment.jsx'
import SubmissionDetails from './pages/Grades/SubmissionDetails.jsx'
import { loader as submissionDetailsLoader } from './pages/Grades/SubmissionDetails.jsx'
import Grades from './pages/Grades/Grades.jsx'
import { loader as gradesLoader } from './pages/Grades/Grades.jsx'
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
        action: signUpAction,
      },
      {
        path: 'log-in',
        element: <LoginStudent />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Profile />,
            action: profileAction,
          },
          // {
          //   path: 'upload/',
          //   element: <Upload />,
          //   action: uploadAction,
          // },
          {
            path: 'add-assignment',
            element: <AddAssignment />,
            action: addAssignmentAction,
          },
          {
            path: 'all-assignments',
            element: <AllAssignments />,
            loader: allAssignmentsLoader,
          },
          {
            path: 'edit-assignment/:id',
            element: <EditAssignment />,
            action: editAssignmentAction,
            loader: editAssignmentsLoader,
          },
          {
            path: 'delete-assignment/:id',
            action: deleteAssignmentAction,
          },
          {
            path: 'view-assignment/:id',
            element: <ViewAssignment />,
            loader: viewAssignmentLoader,
            action: viewAssignmentAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'grades',
            element: <Grades />,
            loader: gradesLoader,
          },
          {
            path: 'submission-details/:id',
            element: <SubmissionDetails />,
            loader: submissionDetailsLoader,
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
