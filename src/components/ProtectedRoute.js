import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, _setUser] = useState(localStorage.getItem('user'))
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoute