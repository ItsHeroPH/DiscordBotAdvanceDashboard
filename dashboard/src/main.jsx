import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import homeLoader from './loader/homeLoader'
import dashboardLoader from './loader/dashboardLoader'
import { mainDashboardLoader } from './loader/dahsboard/mainDashboard'
import { mainConfigurationLoader } from './loader/dahsboard/mainConfiguration'
import { mainReactionLoader } from './loader/dahsboard/mainReaction'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const MainDashboard = lazy(() => import('./pages/dashboard/mainDashboard'))
const MainConfiguration = lazy(() => import('./pages/dashboard/mainConfiguration'))
const MainReaction = lazy(() => import('./pages/dashboard/mainReaction'))

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
  {
    path: "/dashboard/:guildId",
    element: <MainDashboard/>,
    loader: mainDashboardLoader
  },
  {
    path: "/dashboard/:guildId/config",
    element: <MainConfiguration/>,
    loader: mainConfigurationLoader
  },
  {
    path: "/dashboard/:guildId/reactionroles",
    element: <MainReaction/>,
    loader: mainReactionLoader
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
