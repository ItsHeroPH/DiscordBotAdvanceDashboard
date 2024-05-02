import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { homeLoader } from './loaders/home'
import { dashboardLoader } from './loaders/dashboard'
import { notFoundLoader } from './loaders/404'
import { mainDashboardLoader } from './loaders/dashboard/mainDashboard'
import { mainConfigurationLoader } from './loaders/dashboard/mainConfiguration'
import Loading from './components/loading'
import { mainLogsLoader } from './loaders/dashboard/mainLogs'
import { mainLevelingLoader } from './loaders/dashboard/mainLeveling'
import { mainReactionLoader } from './loaders/dashboard/mainReaction'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/404'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const MainDashboard = lazy(() => import('./pages/dashboard/mainDashboard'))
const MainConfiguration = lazy(() => import('./pages/dashboard/mainConfiguration'))
const MainLogs = lazy(() => import('./pages/dashboard/mainLogs'))
const MainReaction = lazy(() => import('./pages/dashboard/mainReaction'))
const MainLeveling = lazy(() => import('./pages/dashboard/mainLeveling'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<Loading/>}>
      <Home/>
    </Suspense>,
    loader: homeLoader
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "/dashboard",
        element: 
        <Suspense fallback={<Loading/>}>
          <Dashboard/>
        </Suspense>,
        loader: dashboardLoader
      },
      {
        path: "/dashboard/:guildID",
        element: <Suspense fallback={<Loading/>}>
          <MainDashboard/>
        </Suspense>,
        loader: mainDashboardLoader
      },
      {
        path: "/dashboard/:guildID/config",
        element: <Suspense fallback={<Loading/>}>
          <MainConfiguration/>
        </Suspense>,
        loader: mainConfigurationLoader
      },
      {
        path: "/dashboard/:guildID/logs",
        element: <Suspense fallback={<Loading/>}>
          <MainLogs/>
        </Suspense>,
        loader: mainLogsLoader
      },
      {
        path: "/dashboard/:guildID/reactionroles",
        element: <Suspense fallback={<Loading/>}>
          <MainReaction/>
        </Suspense>,
        loader: mainReactionLoader
      },
      {
        path: "/dashboard/:guildID/leveling",
        element: <Suspense fallback={<Loading/>}>
          <MainLeveling/>
        </Suspense>,
        loader: mainLevelingLoader
      }
    ]
  },
  {
    path: "*",
    element: <Suspense fallback={<Loading/>}>
      <NotFound/>
    </Suspense>,
    loader: notFoundLoader
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
