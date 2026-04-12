import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import CourseDetails from './pages/CourseDetails.jsx';
import CoursePage from './pages/CoursePage.jsx';
import FavoritePage from './pages/FavoritePage.jsx';
import AllCourseRenderForNav from './pages/AllCourseRenderForNav.jsx';
import EnrollForCode from './pages/EnrollForCode.jsx';
import PostLesson from './pages/PostLesson.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/course/:id",
    element: <CoursePage />,
  },
  {
    path:"/courses/:id",
    element: <CoursePage />

  },
  {
    path: "/favorites",
    element: <FavoritePage />
  },{
    path: "/courseNav",
    element: <AllCourseRenderForNav/>
  },{
    path: "/course",
    element: <AllCourseRenderForNav/>
  },{
    path:"/Enroll",
    element:<EnrollForCode/>
  },{
    path:"/sharing",
    element:(
      <ProtectedRoute>
        <PostLesson/>
      </ProtectedRoute>
    )
  },{
    path:"/login",
    element:<Login/>
  },{
    path:"/register",
    element:<Register/>
  },{
    path:"/about",
    element:<About/>
  },{
    path:"/profile",
    element:<Profile/>
  },{
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
