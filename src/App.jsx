import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/Signup'
import AuthLayout from './components/AuthLayout'
import Dashboard from './pages/Dashboard'
import Applicatons from './pages/Applications'



function App() {
 return (
  <BrowserRouter>
    <Routes>
      <Route element={ <AppLayout/> }>
        <Route path='/' element={ <Home /> }/>
        <Route path='login' element={ <Login />}/>
        <Route path='signup' element={ <Signup />}/>
        <Route element={ <AuthLayout /> }>
          <Route path='dashboard' element={ <Dashboard /> }/>
          <Route path='applications' element={ <Applicatons /> }/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
 )
}

export default App
