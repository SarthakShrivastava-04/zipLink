import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layouts'
import LandingPage from './routes/landing-page'
import Auth from './routes/auth'
import Link from './routes/link'
import Dashboard from './routes/dashboard'
import RedirectLink from './routes/redirect-link'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/dashboard",
        element:<RequireAuth>
                  <Dashboard/>
                </RequireAuth>
      },
      {
        path:"/link/:id",
        element:<RequireAuth>
                  <Link/>
                </RequireAuth>
      },
      {
        path:"/:id",
        element:<RedirectLink/>
      },
    ]
  }
])

function App() {
  return <UrlProvider>
           
           <RouterProvider router = {router}/>
         </UrlProvider>
  
}

export default App