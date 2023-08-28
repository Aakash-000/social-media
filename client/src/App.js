import './App.css';
import React, { useContext } from 'react'
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Navbar } from './components/Navbar/Navbar';
import { Leftbar } from './components/Leftbar/Leftbar';
import { Rightbar } from './components/Rightbar/Rightbar';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

  function App(){

    const queryClient = new QueryClient()

  const Layout =()=>{
    
      return(
      <QueryClientProvider client={queryClient}>  
      <div>
      <Navbar/>
      <div className='app_layout' style={{display:'flex'}}>
      <div style={{flex:'0.2'}}>
      <Leftbar/>
      </div>
      <div className='app_outlet' style={{flex:'0.55'}}><Outlet/></div>
      <div style={{flex:'0.25'}}>
      <Rightbar/>
      </div>
      </div>
      </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({children}) => {
    const [state] = useContext(AuthContext);

    if(!state.info.username){
      return <Navigate to="/login"/>
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element:(
      <ProtectedRoute>
        <Layout/>
        </ProtectedRoute>
        ),
      children:
      [{
        path:"/",
        element:<Home/>
      },
      {
        path:"/profile/:userId",
        element:<Profile/>
      }
    ]
    },
    {
      path:"/login",
      element:<Login/>
    }
    ,{
      path:'/register'
      ,element:<Register/>
    }
  ])
  return(
    <div className='App'>
      <AuthProvider>
      <RouterProvider router={router}>
      </RouterProvider>
      </AuthProvider>
    </div>
  )
  }


export default App;
