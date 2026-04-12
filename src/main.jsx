import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CourseDetails from './pages/CourseDetails.jsx';
import CoursePage from './pages/CoursePage.jsx';
import FavoritePage from './pages/FavoritePage.jsx';
import AllCourseRenderForNav from './pages/AllCourseRenderForNav.jsx';
import EnrollForCode from './pages/EnrollForCode.jsx';

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
    path:"/Enroll",
    element:<EnrollForCode/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
