import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventList from "./components/EventList.jsx"
import EventDetails from "./components/EventDetails.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <EventList />,
  },
  {
    path: "/events/:eventId",
    element: <EventDetails />,
  },
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
