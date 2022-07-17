import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedInUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch()
 

  useEffect(() => {
    if(!auth.authenticated){
     dispatch(isLoggedInUser())
    }
 },[])

  return (
    <Router>
       <Routes>
       <Route element={<ProtectedRoute />}>
       <Route path='/' element={<Home />}></Route>
       </Route>

           <Route path='/login' element={<Login />}></Route>
           <Route path='/signup' element={<Signup />}></Route>

       </Routes>
    </Router>
   
  );
}

export default App;
