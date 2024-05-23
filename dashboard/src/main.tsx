import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { homeLoader } from './loaders/homeLoader'

const Home = lazy(() => import('./pages'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const DashboardHome = lazy(() => import('./pages/dashboard/[guild]'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    loader: homeLoader
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    loader: homeLoader
  },
  {
    path: "/dashboard/:guildId",
    element: <DashboardHome/>,
    loader: homeLoader
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
