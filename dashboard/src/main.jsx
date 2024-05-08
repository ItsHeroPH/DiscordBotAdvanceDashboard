import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import homeLoader from './loader/homeLoader'
import dashboardLoader from './loader/dashboardLoader'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    loader: homeLoader
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    loader: dashboardLoader
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
