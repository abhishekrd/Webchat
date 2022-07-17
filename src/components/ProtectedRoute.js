import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'

const user = localStorage.getItem('user');

const ProtectedRoute = () => {
  return (

   user ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default ProtectedRoute